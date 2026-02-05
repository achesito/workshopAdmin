from rest_framework import viewsets, status
import json
from rest_framework.response import Response
from ...services import establismentService
from ...serializer import establishmentSerializer

class EstablishmentViewSet(viewsets.ModelViewSet):
    queryset = establismentService.objects()
    serializer_class = establishmentSerializer
    