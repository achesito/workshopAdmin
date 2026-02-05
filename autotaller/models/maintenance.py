#clase mantenimiento
from django.db import models
from .vehicle import Vehicle

class Maintenance(models.Model):
    diagnosis = models.CharField(max_length=90, blank=False, null=False)
    cost_job = models.DecimalField(max_digits=5, decimal_places=2, null=False)
    task_status = models.CharField(max_length=40, blank=False, null=False)
    date = models.DateField(blank=False,null=False)
    type = models.CharField(max_length=30, blank=False, null=False)
    idMaintenance = models.AutoField(primary_key=True, unique=True, null=False)
    total = models.DecimalField(max_digits=6, decimal_places=2, null=False)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    payment_method = models.CharField(blank=False, null=False, max_length=40)