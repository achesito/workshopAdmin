#clase de asociacion detallesRepuesto
from django.db import models
from .spare import Spare
from .maintenance import Maintenance

class SpareDetails(models.Model):
    quantity = models.IntegerField(null=False)
    total = models.DecimalField(max_digits=6, decimal_places=2)
    spare = models.ForeignKey(Spare, on_delete=models.CASCADE)
    maintenance = models.ForeignKey(Maintenance, on_delete=models.CASCADE)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['spare', 'maintenance'], name='unique_spare_maintenance')
        ]