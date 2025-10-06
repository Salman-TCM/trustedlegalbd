from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import ServiceCategory, Service, ServiceInquiry, Testimonial
from .serializers import (
    ServiceCategorySerializer, ServiceListSerializer, ServiceDetailSerializer,
    ServiceInquirySerializer, ServiceInquiryAdminSerializer, TestimonialSerializer
)


class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'name']
    ordering = ['order']


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status']
    search_fields = ['title', 'short_description', 'full_description']
    ordering_fields = ['order', 'title', 'created_at', 'price']
    ordering = ['order']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceDetailSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff:
            return queryset
        return queryset.filter(status__in=['active', 'featured'])

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_services = self.get_queryset().filter(status='featured')
        serializer = ServiceListSerializer(featured_services, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category_id = request.query_params.get('category_id')
        if category_id:
            services = self.get_queryset().filter(category_id=category_id)
            serializer = ServiceListSerializer(services, many=True)
            return Response(serializer.data)
        return Response({'error': 'category_id parameter is required'}, 
                       status=status.HTTP_400_BAD_REQUEST)


class ServiceInquiryViewSet(viewsets.ModelViewSet):
    queryset = ServiceInquiry.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['service', 'status']
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return ServiceInquiryAdminSerializer
        return ServiceInquirySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff:
            return queryset
        if self.request.user.is_authenticated:
            return queryset.filter(email=self.request.user.email)
        return queryset.none()

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def update_status(self, request, pk=None):
        if not request.user.is_staff:
            return Response({'error': 'Permission denied'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        inquiry = self.get_object()
        new_status = request.data.get('status')
        notes = request.data.get('notes', '')
        
        if new_status not in dict(ServiceInquiry.STATUS_CHOICES):
            return Response({'error': 'Invalid status'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        inquiry.status = new_status
        if notes:
            inquiry.notes = notes
        inquiry.assigned_to = request.user
        inquiry.save()
        
        serializer = self.get_serializer(inquiry)
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['service', 'is_featured', 'is_active', 'rating']
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff:
            return queryset
        return queryset.filter(is_active=True)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_testimonials = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(featured_testimonials, many=True)
        return Response(serializer.data)