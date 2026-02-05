from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from ...services import CustomerVehicleService
from ...services import Customer
from ...serializer import customerSerializer
from ...services import vehicleService
from ...serializer import vehicleSerializer
from ...serializer import CustomerVehicleSerializer

class CustomerVehicleViewSet(viewsets.ModelViewSet):
    queryset = CustomerVehicleService.objects()
    serializer_class = CustomerVehicleSerializer
    
    @action(detail=False, methods=['get'], url_path='order')
    def orderDate(self, request):
        plate = request.GET.get('vehicle')
        field = CustomerVehicleService.orderDate(plate)
        serializer = self.get_serializer(field, many=False)
        if (field is not None):
            return Response(serializer.data)
        else:
            return Response({'error': 'not found XD'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False,methods=['get'], url_path="customer")
    def getCustomer(self, request):
        car = request.GET.get('vehicle')
        vehicle = vehicleService.objects().filter(plate=car).first()
        idCust = CustomerVehicleService.objects().filter(vehicle=car).first().customer.id_card
        customer = Customer.objects.filter(id_card=idCust).first()
        serializer = customerSerializer(customer, many=False, context={'request': request})
        serializerCar = vehicleSerializer(vehicle, many=False, context={'request' : request})
        data = (serializer.data, serializerCar.data)
        return Response(data)
        
    @action(detail=False, methods=['get'], url_path='totalCustomer')
    def totalCustomerCars(self, request):
        data = request.GET.get('vehicle')
        elements = CustomerVehicleService.getCustomer(data)
        serializer = self.get_serializer(elements[1], many=False)
        return Response({
            'customer' : serializer.data,
            'total' : elements[0]
        })
        
    