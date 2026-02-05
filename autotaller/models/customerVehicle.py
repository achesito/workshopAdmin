from .customer import Customer
from .vehicle import Vehicle    
from django.db import models

class CustomerVehicle(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    incomeDate = models.DateField(auto_now_add=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['customer', 'vehicle'], name='unique_customer_vehicle')
        ]