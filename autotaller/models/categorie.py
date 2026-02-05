from django.db import models

class Categorie(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=60,blank=False, unique=True, null=False)
    details = models.CharField(max_length=70,null=True, blank=True)
    type = models.CharField(max_length=40, null=False)