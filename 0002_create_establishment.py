text = '''from django.db import migrations

def create_default(app, schema_editor):
    Establishment = app.get_model('autotaller','Establishment')
    Establishment.objects.get_or_create(
        name='workship example',
        defaults={
            'address' : 'example address',
            'phone_number' : '0000-0000',
            'economic_activity' : 'activity example',
            'mail' : 'example@gmail.com',
            'tax_added' : 0,
            'currencyName' : 'USD',
            'legalIdentifier' : '00000000000000',
            'taxIdentifier' : 'ABC0000-000000'
        }   
    )
    
class Migration(migrations.Migration):

    dependencies = [
      ('autotaller','0001_initial')
    ]
    
    operations = [
        migrations.RunPython(create_default)
    ]'''  
    

with open('autotaller/migrations/0002_establishment.py', 'w') as f:
    f.write(text)