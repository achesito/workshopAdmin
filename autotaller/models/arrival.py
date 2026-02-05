from django.db import models
from .provider import Provider

class Arrival(models.Model):
    idArrival = models.AutoField(primary_key=True)
    arrivalDate = models.DateField(unique=False, blank=False, null=False)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    description = models.CharField(max_length=150, null=True, blank=True)