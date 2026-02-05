#clase vehiculo encargada de llevar sus datos
from django.db import models

class Vehicle(models.Model):
    year = models.IntegerField(null=False)
    color = models.CharField(max_length=20, blank=False, null=False)
    engine_info = models.CharField(max_length=80, blank=False, unique=False, null=False)
    distance = models.CharField(max_length=30,blank=False, unique=False, null=False)
    plate = models.CharField(max_length=10, blank=False, null=False, primary_key=True, unique=True)
    model = models.CharField(max_length=40, blank=False, null=False)
    transmition = models.CharField(max_length=20, blank=False, null=False)