from rest_framework import serializers
from .models import ServiceCategory, Service, ServiceInquiry, Testimonial
from django.contrib.auth.models import User


class ServiceCategorySerializer(serializers.ModelSerializer):
    services_count = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'icon', 'order', 'services_count', 'created_at']
        read_only_fields = ['created_at']

    def get_services_count(self, obj):
        return obj.services.filter(status='active').count()


class ServiceListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Service
        fields = ['id', 'title', 'slug', 'category', 'category_name', 'short_description', 
                 'icon', 'image', 'price', 'price_unit', 'status', 'order', 'created_at']
        read_only_fields = ['slug', 'created_at']


class ServiceDetailSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=ServiceCategory.objects.all(),
        source='category',
        write_only=True
    )
    testimonials = serializers.SerializerMethodField()
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ['slug', 'created_at', 'updated_at', 'created_by']

    def get_testimonials(self, obj):
        testimonials = obj.testimonials.filter(is_active=True)[:3]
        return TestimonialSerializer(testimonials, many=True).data

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)


class ServiceInquirySerializer(serializers.ModelSerializer):
    service_title = serializers.CharField(source='service.title', read_only=True)
    
    class Meta:
        model = ServiceInquiry
        fields = ['id', 'service', 'service_title', 'name', 'email', 'phone', 
                 'company', 'message', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']


class ServiceInquiryAdminSerializer(serializers.ModelSerializer):
    service_title = serializers.CharField(source='service.title', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.username', read_only=True)
    
    class Meta:
        model = ServiceInquiry
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class TestimonialSerializer(serializers.ModelSerializer):
    service_title = serializers.CharField(source='service.title', read_only=True, allow_null=True)
    
    class Meta:
        model = Testimonial
        fields = ['id', 'service', 'service_title', 'client_name', 'client_title', 
                 'client_company', 'client_image', 'rating', 'content', 
                 'is_featured', 'is_active', 'created_at']
        read_only_fields = ['created_at']