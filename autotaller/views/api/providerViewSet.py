from rest_framework import viewsets, status
import json
from ...services import providerService
from ...serializer import providerSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class providerViewSet(viewsets.ModelViewSet):
    queryset = providerService.objects()
    serializer_class = providerSerializer
    
    def list(self, request, *args, **kwargs):
        start = request.GET.get('start')
        order = request.GET.get('order')
        level = 0
        if (int(start) == 0):
            level = (providerService.objects().count() % int(order)) if providerService.objects().count() < int(order) else int(order)
        else:
            result = providerService.objects().count() - (int(order) * int(start))
            level = int(order) + (int(order) * int(start)) if result > int(order) else providerService.objects().count()
        items = providerService.objects()[(int(order) * int(start)) : level]
        return Response({
            'items' : providerSerializer(items, many=True).data,
            'total' : providerService.objects().count()  
        })
    
    @action(detail=False, methods=['get'], url_path='getByName')
    def getByName(self, request):
        value = request.GET.get('name')
        identifier = providerService.getByName(value)
        serializer = providerSerializer(identifier, many=False, context={'request':request})
        if (identifier is not None):
            return Response(serializer.data)
        else:
            return Response({'error' : 'no categorie named like this'}, status=status.HTTP_403_FORBIDDEN)