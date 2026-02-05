#clase vehiculo imagen que contiene las fotos del vehiculo
from django.db import models
from .vehicle import Vehicle

class VehicleImage(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    idPhoto = models.AutoField(primary_key=True, null=False)
    photoUrl = models.ImageField(upload_to='img/')
    