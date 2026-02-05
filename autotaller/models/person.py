#clase encargada de funcionar para persona
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    id_card = models.CharField(max_length=20, blank=False, null=False, primary_key=True, unique=True)
    mail = models.CharField(max_length=80, blank=False, null=False, unique=True)
    