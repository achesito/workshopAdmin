#clase cliente la cual hereda de la clase persona
from django.db import models
from .person import Person

class Customer(Person):
    documentType = models.CharField(max_length=30, blank=False, null=False)
    