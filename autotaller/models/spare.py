#clase repuesto donde estan contenidas todos los datos de repuesto
from django.db import models
from .categorie import Categorie

class Spare(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    price = models.DecimalField(max_digits=5,decimal_places=2, null=False)
    details = models.CharField(max_length=100, blank=True, null=True)
    code = models.AutoField(primary_key=True, unique=True)
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    