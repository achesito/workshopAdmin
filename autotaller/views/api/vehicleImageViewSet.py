from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from ...services import imageService
from django.db import transaction
from django.db.models.signals import post_delete
from django.dispatch import receiver
from ...serializer import vehicleImageSerializer
    
class VehicleImageViewSet(viewsets.ModelViewSet):
    queryset = imageService.objects()
    serializer_class = vehicleImageSerializer
    
    def perform_create(self, serializer):
        with transaction.atomic():
            image = serializer.save()
            
            data = (
                imageService.objects().
                filter(vehicle_id=image.vehicle).
                order_by('-idPhoto')
            ) 
            
            if (len(data) > 4):
                elements = data[4:]
                
                for img in elements:
                    img.delete()
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'], url_path="image")
    def getByPlaca(self, request):
        plate = request.GET.get('plate')
        vehicleImage = imageService.getVehicle(plate)
        serializer = vehicleImageSerializer(vehicleImage, many=False, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path="images")
    def getAll(self, request):
        plate = request.GET.get('plate')
        vehicleImage = imageService.getVehicles(plate)
        serializer = vehicleImageSerializer(vehicleImage, many=True, context={'request': request})
        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)