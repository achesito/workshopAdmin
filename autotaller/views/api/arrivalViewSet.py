from rest_framework import viewsets
from ...services import arrivalService
from rest_framework.decorators import action
from rest_framework.response import Response
from ...serializer import arrivalSerializer

class ArrivalViewSet(viewsets.ModelViewSet):
    queryset = arrivalService.objects()
    serializer_class = arrivalSerializer
    