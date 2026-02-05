from django.db import models

class Provider(models.Model):
    code = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40, blank=False, null=False, unique=True)
    country = models.CharField(max_length=50, blank=False, unique=False, null=False)
    ubication = models.CharField(max_length=80, blank=False, unique=False, null=False)
    phone_number = models.CharField(max_length=20, blank=False, null=False)