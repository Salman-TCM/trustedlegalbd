import pandas as pd
from django.http import HttpResponse
from django.contrib import messages
from django.shortcuts import render, redirect
from django.urls import path
from django.core.exceptions import ValidationError
from io import BytesIO
import openpyxl
from datetime import datetime


def export_service_categories_excel(modeladmin, request, queryset):
    """Export selected Service Categories to Excel"""
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = f'attachment; filename="service_categories_{datetime.now().strftime("%Y%m%d_%H%M%S")}.xlsx"'
    
    data = []
    for category in queryset:
        data.append({
            'ID': category.id,
            'Name': category.name,
            'Description': category.description,
            'Icon': category.icon,
            'Order': category.order,
            'Created At': category.created_at.strftime('%Y-%m-%d %H:%M:%S') if category.created_at else '',
        })
    
    df = pd.DataFrame(data)
    
    with BytesIO() as buffer:
        with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
            df.to_excel(writer, sheet_name='Service Categories', index=False)
            
            workbook = writer.book
            worksheet = writer.sheets['Service Categories']
            
            for column in worksheet.columns:
                max_length = 0
                column_letter = column[0].column_letter
                for cell in column:
                    try:
                        if len(str(cell.value)) > max_length:
                            max_length = len(str(cell.value))
                    except:
                        pass
                adjusted_width = min(max_length + 2, 50)
                worksheet.column_dimensions[column_letter].width = adjusted_width
        
        buffer.seek(0)
        response.write(buffer.getvalue())
    
    return response


def export_services_excel(modeladmin, request, queryset):
    """Export selected Services to Excel"""
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = f'attachment; filename="services_{datetime.now().strftime("%Y%m%d_%H%M%S")}.xlsx"'
    
    data = []
    for service in queryset:
        data.append({
            'ID': service.id,
            'Title': service.title,
            'Slug': service.slug,
            'Category': service.category.name if service.category else '',
            'Short Description': service.short_description,
            'Full Description': service.full_description,
            'Price': str(service.price) if service.price else '',
            'Price Unit': service.price_unit,
            'Duration': service.duration,
            'Icon': service.icon,
            'Status': service.status,
            'Order': service.order,
            'Created By': service.created_by.username if service.created_by else '',
            'Created At': service.created_at.strftime('%Y-%m-%d %H:%M:%S') if service.created_at else '',
            'Updated At': service.updated_at.strftime('%Y-%m-%d %H:%M:%S') if service.updated_at else '',
        })
    
    df = pd.DataFrame(data)
    
    with BytesIO() as buffer:
        with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
            df.to_excel(writer, sheet_name='Services', index=False)
            
            workbook = writer.book
            worksheet = writer.sheets['Services']
            
            for column in worksheet.columns:
                max_length = 0
                column_letter = column[0].column_letter
                for cell in column:
                    try:
                        if len(str(cell.value)) > max_length:
                            max_length = len(str(cell.value))
                    except:
                        pass
                adjusted_width = min(max_length + 2, 50)
                worksheet.column_dimensions[column_letter].width = adjusted_width
        
        buffer.seek(0)
        response.write(buffer.getvalue())
    
    return response


export_service_categories_excel.short_description = "Export selected categories to Excel"
export_services_excel.short_description = "Export selected services to Excel"


def import_service_categories_excel(file, user=None):
    """Import Service Categories from Excel file"""
    from .models import ServiceCategory
    
    try:
        df = pd.read_excel(file, sheet_name='Service Categories')
        
        created_count = 0
        updated_count = 0
        errors = []
        
        for index, row in df.iterrows():
            try:
                category_id = row.get('ID')
                
                if pd.notna(category_id):
                    try:
                        category = ServiceCategory.objects.get(id=int(category_id))
                        updated_count += 1
                    except ServiceCategory.DoesNotExist:
                        category = ServiceCategory()
                        created_count += 1
                else:
                    category = ServiceCategory()
                    created_count += 1
                
                if pd.notna(row.get('Name')):
                    category.name = str(row['Name'])
                
                if pd.notna(row.get('Description')):
                    category.description = str(row['Description'])
                
                if pd.notna(row.get('Icon')):
                    category.icon = str(row['Icon'])
                
                if pd.notna(row.get('Order')):
                    category.order = int(row['Order'])
                
                category.full_clean()
                category.save()
                
            except Exception as e:
                errors.append(f"Row {index + 2}: {str(e)}")
        
        return {
            'created': created_count,
            'updated': updated_count,
            'errors': errors
        }
        
    except Exception as e:
        return {
            'created': 0,
            'updated': 0,
            'errors': [f"File processing error: {str(e)}"]
        }


def import_services_excel(file, user=None):
    """Import Services from Excel file"""
    from .models import Service, ServiceCategory
    from django.utils.text import slugify
    
    try:
        df = pd.read_excel(file, sheet_name='Services')
        
        created_count = 0
        updated_count = 0
        errors = []
        
        for index, row in df.iterrows():
            try:
                service_id = row.get('ID')
                
                if pd.notna(service_id):
                    try:
                        service = Service.objects.get(id=int(service_id))
                        updated_count += 1
                    except Service.DoesNotExist:
                        service = Service()
                        created_count += 1
                else:
                    service = Service()
                    created_count += 1
                
                if pd.notna(row.get('Title')):
                    service.title = str(row['Title'])
                    if not service.slug:
                        service.slug = slugify(service.title)
                
                if pd.notna(row.get('Slug')):
                    service.slug = str(row['Slug'])
                
                if pd.notna(row.get('Category')):
                    try:
                        category = ServiceCategory.objects.get(name=str(row['Category']))
                        service.category = category
                    except ServiceCategory.DoesNotExist:
                        errors.append(f"Row {index + 2}: Category '{row['Category']}' not found")
                        continue
                
                if pd.notna(row.get('Short Description')):
                    service.short_description = str(row['Short Description'])
                
                if pd.notna(row.get('Full Description')):
                    service.full_description = str(row['Full Description'])
                
                if pd.notna(row.get('Price')):
                    try:
                        service.price = float(row['Price'])
                    except:
                        pass
                
                if pd.notna(row.get('Price Unit')):
                    service.price_unit = str(row['Price Unit'])
                
                if pd.notna(row.get('Duration')):
                    service.duration = str(row['Duration'])
                
                if pd.notna(row.get('Icon')):
                    service.icon = str(row['Icon'])
                
                if pd.notna(row.get('Status')):
                    service.status = str(row['Status'])
                
                if pd.notna(row.get('Order')):
                    service.order = int(row['Order'])
                
                if not service.created_by and user:
                    service.created_by = user
                
                service.full_clean()
                service.save()
                
            except Exception as e:
                errors.append(f"Row {index + 2}: {str(e)}")
        
        return {
            'created': created_count,
            'updated': updated_count,
            'errors': errors
        }
        
    except Exception as e:
        return {
            'created': 0,
            'updated': 0,
            'errors': [f"File processing error: {str(e)}"]
        }