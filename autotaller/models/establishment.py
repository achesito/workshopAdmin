from django.db import models

class Establishment(models.Model):
    name = models.CharField(max_length=70, blank=False, null=False)
    address = models.CharField(max_length=150, blank=False, null=False)
    phone_number = models.CharField(max_length=20, unique=True)
    economic_activity = models.CharField(max_length=150, blank=False, null=False)
    mail = models.CharField(max_length=50, blank=False, unique=True)
    tax_added = models.IntegerField(default=0,null=False)
    currencyName = models.CharField(max_length=50, null=False)
    legalIdentifier = models.CharField(max_length=27, blank=True, null=False)
    taxIdentifier = models.CharField(max_length=27, blank=True, null=False)