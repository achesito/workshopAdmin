from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from ...services import spareDetailsService
from ...serializer import spareDetailsSerializer
from ...serializer import spareSerializer

class SpareDetailsViewSet(viewsets.ModelViewSet):
    queryset = spareDetailsService.objects()
    serializer_class = spareDetailsSerializer
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'], url_path="maintenance")
    def getByPlaca(self, request):
        items = []
        id = request.GET.get('idMaintenance')
        details = spareDetailsService.getByMaintenance(id)
        serializerDetails = spareDetailsSerializer(details[0], many=True, context={'request': request})
        serializerSpares = spareSerializer(details[1], many=True, context={'request': request})
        items.append(serializerDetails.data)
        items.append(serializerSpares.data)
        return Response(items)
    
    def get_object(self):
        mantId = self.kwargs['maintenance']
        spareId = self.kwargs['spare']
        return get_object_or_404(
            spareDetailsService.sparedetails,
            maintenance=mantId,
            spare=spareId
        )
        