# signals.py
from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import VehicleImage

@receiver(post_delete, sender=VehicleImage)
def delete_img(sender, instance, **kwargs):
    if instance.photoUrl:
        instance.photoUrl.delete(save=False)
