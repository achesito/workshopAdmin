from rest_framework import viewsets, status
import json
from rest_framework.response import Response
from ...services import customerService
from ...serializer import customerSerializer
from rest_framework.decorators import action
    
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = customerService.objects()
    serializer_class = customerSerializer
    
    def create(self, request, *args, **kwargs):
        source = request.data
        if customerService.find(source['mail']) is not None and customerService.find(source['mail']).id_card != id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return super().create(request, *args, **kwargs)
        
    @action(detail=False, methods=['get'], url_path='initials')
    def initials(self, request):
        idCard = request.GET.get('id_card')
        cust = customerService.initials(idCard)
        serializer = self.get_serializer(cust, many=True)
        if (len(cust) > 0):
            return Response(serializer.data)
        else:
            return Response({'error': 'no encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, *args, **kwargs):
        source = request.data
        if customerService.find(source['mail']) is not None:
            return Response.status_code(status=status.HTTP_400_BAD_REQUEST)
        else:
            instance = self.get_object()
            serializer = self.get_serializer(instance,data=source)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response.status_code(status=status.HTTP_204_NO_CONTENT)