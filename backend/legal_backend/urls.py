"""
URL configuration for legal_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from services.admin_views import download_template

def health_check(request):
    return JsonResponse({"status": "healthy", "message": "TrustedLegal BD API is running"})

def root_view(request):
    return JsonResponse({
        "message": "TrustedLegal BD Backend API", 
        "status": "running",
        "endpoints": {
            "health": "/api/health/",
            "auth": "/api/auth/",
            "services": "/api/",
            "admin": "/admin/",
            "docs": "/api/docs/"
        }
    })

urlpatterns = [
    path('', root_view, name='root'),
    path('admin/', admin.site.urls),
    # Admin Excel template downloads
    path('admin/download-template/<str:model_type>/', download_template, name='download_template'),
    # Health check
    path('api/health/', health_check, name='health_check'),
    path('health/', health_check, name='health_check_simple'),
    # API endpoints
    path('api/auth/', include('authentication.urls')),
    path('api/', include('services.urls')),
    # API documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
