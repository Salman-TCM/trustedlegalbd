from django.contrib import admin
from django.urls import path, reverse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse
from .models import ServiceCategory, Service, ServiceInquiry, Testimonial
from .forms import ServiceAdminForm, ServiceCategoryAdminForm
from .admin_excel import (
    export_service_categories_excel, export_services_excel,
    import_service_categories_excel, import_services_excel
)
import pandas as pd
from datetime import datetime


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    form = ServiceCategoryAdminForm
    list_display = ['name', 'order', 'created_at']
    list_editable = ['order']
    search_fields = ['name']
    ordering = ['order', 'name']
    actions = [export_service_categories_excel]
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('import-excel/', self.import_excel_view, name='services_servicecategory_import_excel'),
        ]
        return custom_urls + urls
    
    def import_excel_view(self, request):
        if request.method == 'POST':
            excel_file = request.FILES.get('excel_file')
            if excel_file:
                result = import_service_categories_excel(excel_file, request.user)
                
                if result['created'] or result['updated']:
                    messages.success(
                        request,
                        f"Successfully imported: {result['created']} created, {result['updated']} updated"
                    )
                
                for error in result['errors']:
                    messages.error(request, error)
                
                return redirect('admin:services_servicecategory_changelist')
        
        context = {
            'title': 'Import Service Categories',
            'model_name': 'Service Categories',
            'model_type': 'category',
            'cancel_url': reverse('admin:services_servicecategory_changelist'),
        }
        return render(request, 'admin/import_excel.html', context)
    
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['import_url'] = reverse('admin:services_servicecategory_import_excel')
        return super().changelist_view(request, extra_context=extra_context)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm
    list_display = ['title', 'category', 'status', 'price', 'order', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    list_editable = ['status', 'order']
    search_fields = ['title', 'short_description', 'full_description']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at', 'created_by']
    ordering = ['order', 'title']
    actions = [export_services_excel]
    
    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('import-excel/', self.import_excel_view, name='services_service_import_excel'),
        ]
        return custom_urls + urls
    
    def import_excel_view(self, request):
        if request.method == 'POST':
            excel_file = request.FILES.get('excel_file')
            if excel_file:
                result = import_services_excel(excel_file, request.user)
                
                if result['created'] or result['updated']:
                    messages.success(
                        request,
                        f"Successfully imported: {result['created']} created, {result['updated']} updated"
                    )
                
                for error in result['errors']:
                    messages.error(request, error)
                
                return redirect('admin:services_service_changelist')
        
        context = {
            'title': 'Import Services',
            'model_name': 'Services',
            'model_type': 'service',
            'cancel_url': reverse('admin:services_service_changelist'),
        }
        return render(request, 'admin/import_excel.html', context)
    
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['import_url'] = reverse('admin:services_service_import_excel')
        return super().changelist_view(request, extra_context=extra_context)


@admin.register(ServiceInquiry)
class ServiceInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'service', 'email', 'phone', 'status', 'assigned_to', 'created_at']
    list_filter = ['status', 'service', 'created_at', 'assigned_to']
    list_editable = ['status', 'assigned_to']
    search_fields = ['name', 'email', 'phone', 'message']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone', 'company')
        }),
        ('Inquiry Details', {
            'fields': ('service', 'message')
        }),
        ('Management', {
            'fields': ('status', 'assigned_to', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'service', 'rating', 'is_featured', 'is_active', 'created_at']
    list_filter = ['rating', 'is_featured', 'is_active', 'service']
    list_editable = ['is_featured', 'is_active']
    search_fields = ['client_name', 'content']
    readonly_fields = ['created_at']
    ordering = ['-created_at']