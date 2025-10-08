from django.http import HttpResponse
from django.contrib.admin.views.decorators import staff_member_required
import pandas as pd
from io import BytesIO
import openpyxl


@staff_member_required
def download_template(request, model_type):
    """Download Excel template for importing data"""
    
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    
    if model_type == 'category':
        response['Content-Disposition'] = 'attachment; filename="service_categories_template.xlsx"'
        
        data = {
            'ID': ['', '', ''],
            'Name': ['Legal Consultation', 'Document Services', 'Court Representation'],
            'Description': [
                'Professional legal advice and consultation services',
                'Document preparation and review services',
                'Legal representation in court proceedings'
            ],
            'Icon': ['fa-gavel', 'fa-file-text', 'fa-balance-scale'],
            'Order': [1, 2, 3]
        }
        
        df = pd.DataFrame(data)
        sheet_name = 'Service Categories'
        
    else:  # service
        response['Content-Disposition'] = 'attachment; filename="services_template.xlsx"'
        
        data = {
            'ID': ['', '', ''],
            'Title': ['Contract Review', 'Legal Opinion', 'Property Documentation'],
            'Slug': ['contract-review', 'legal-opinion', 'property-documentation'],
            'Category': ['Legal Consultation', 'Legal Consultation', 'Document Services'],
            'Short Description': [
                'Professional contract review and analysis',
                'Expert legal opinion on complex matters',
                'Complete property documentation services'
            ],
            'Full Description': [
                'Comprehensive contract review including risk assessment and recommendations',
                'Detailed legal opinion with case law references and practical recommendations',
                'End-to-end property documentation including verification and registration'
            ],
            'Features': [
                'Risk assessment, Contract analysis, Legal recommendations',
                'Case law research, Written opinion, Strategic advice',
                'Title verification, Document drafting, Registration support'
            ],
            'Price': [5000, 10000, 15000],
            'Price Unit': ['per document', 'per opinion', 'per property'],
            'Duration': ['2-3 days', '5-7 days', '10-15 days'],
            'Icon': ['fa-file-contract', 'fa-lightbulb', 'fa-home'],
            'Status': ['active', 'active', 'active'],
            'Order': [1, 2, 3]
        }
        
        df = pd.DataFrame(data)
        sheet_name = 'Services'
    
    with BytesIO() as buffer:
        with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
            df.to_excel(writer, sheet_name=sheet_name, index=False)
            
            workbook = writer.book
            worksheet = writer.sheets[sheet_name]
            
            # Add header formatting
            header_font = openpyxl.styles.Font(bold=True)
            for cell in worksheet[1]:
                cell.font = header_font
            
            # Adjust column widths
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
            
            # Add comments to headers for guidance
            worksheet['A1'].comment = openpyxl.comments.Comment(
                'Leave empty for new records, provide existing ID to update',
                'Import Template'
            )
            
            if model_type == 'category':
                worksheet['B1'].comment = openpyxl.comments.Comment(
                    'Required: Unique category name',
                    'Import Template'
                )
            else:
                worksheet['B1'].comment = openpyxl.comments.Comment(
                    'Required: Service title',
                    'Import Template'
                )
                worksheet['D1'].comment = openpyxl.comments.Comment(
                    'Must match existing category name',
                    'Import Template'
                )
                worksheet['G1'].comment = openpyxl.comments.Comment(
                    'Comma-separated list of features (e.g., Feature 1, Feature 2, Feature 3)',
                    'Import Template'
                )
        
        buffer.seek(0)
        response.write(buffer.getvalue())
    
    return response