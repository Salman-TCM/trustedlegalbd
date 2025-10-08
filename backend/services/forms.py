from django import forms
from django.core.exceptions import ValidationError
from .models import Service, ServiceCategory
import json


class FeaturesField(forms.CharField):
    """Custom field that accepts both comma-separated strings and JSON arrays"""
    
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('widget', forms.Textarea(attrs={
            'rows': 4,
            'placeholder': 'Enter features separated by commas (e.g., Expert consultation, 24/7 support, Quick delivery)\n\nOr enter JSON array: ["Feature 1", "Feature 2", "Feature 3"]'
        }))
        super().__init__(*args, **kwargs)
    
    def clean(self, value):
        if not value or not value.strip():
            return []
        
        value = value.strip()
        
        # Try to parse as JSON first
        if value.startswith('[') and value.endswith(']'):
            try:
                parsed = json.loads(value)
                if isinstance(parsed, list):
                    return [str(item).strip() for item in parsed if str(item).strip()]
                else:
                    raise ValidationError("JSON must be an array of strings")
            except json.JSONDecodeError:
                raise ValidationError("Invalid JSON format")
        
        # Otherwise, treat as comma-separated string
        features = [f.strip() for f in value.split(',') if f.strip()]
        return features


class ServiceAdminForm(forms.ModelForm):
    features = FeaturesField(
        required=False,
        help_text="Enter features as comma-separated text or JSON array"
    )
    
    class Meta:
        model = Service
        fields = '__all__'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Convert features list to comma-separated string for display
        if self.instance and self.instance.pk and self.instance.features:
            self.initial['features'] = ', '.join(self.instance.features)
    
    def clean_features(self):
        return self.cleaned_data.get('features', [])


class ServiceCategoryAdminForm(forms.ModelForm):
    class Meta:
        model = ServiceCategory
        fields = '__all__'
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4}),
        }