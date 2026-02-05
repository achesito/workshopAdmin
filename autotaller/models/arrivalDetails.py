from django.db import models
from .arrival import Arrival
from .spare import Spare

class ArrivalDetails(models.Model):
    spare = models.ForeignKey(Spare,on_delete=models.CASCADE)
    arrival = models.ForeignKey(Arrival, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=False, blank=False)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['spare', 'arrival'], name='unique_spare_arrival')
        ]