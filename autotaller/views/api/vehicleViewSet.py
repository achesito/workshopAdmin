from rest_framework import viewsets, status
import json
from rest_framework.response import Response
from rest_framework.decorators import action
from ...services import vehicleService
from ...serializer import vehicleSerializer
    
    
class VehicleViewSet(viewsets.ModelViewSet):
    queryset = vehicleService.objects()
    serializer_class = vehicleSerializer
    
    
    def list(self, request, *args, **kwargs):
        start = self.request.GET.get('start')
        order = self.request.GET.get('order')
        level = 0
        if (int(start) == 0):
            level = (vehicleService.objects().count() % int(order)) if vehicleService.objects().count() < int(order) else int(order)
        else:
            result = vehicleService.objects().count() - (int(order) * int(start))
            level = int(order) + (int(order) * int(start)) if result > int(order) else vehicleService.objects().count()
        items = vehicleService.objects()[(int(order) * int(start)) : level]
        return Response({
            'items' : vehicleSerializer(items, many=True).data,
            'total' : vehicleService.objects().count()  
        })
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
        
    @action(detail=False, methods=['get'], url_path='getplate')
    def getByPlate(self, request):
        plate = request.GET.get('plate')
        pols = vehicleService.firsts(plate)
        #necessary to transform this list to Json
        serializer = self.get_serializer(pols, many=True)
        if len(pols) > 0:
            return Response({
                'items' : serializer.data,
                'total' : len(pols)
            })
        else:
            return Response({'error': 'no encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['get'], url_path='initials')
    def initials(self, request):
        text = request.GET.get('plate')
        elements = vehicleService.firsts(text)
        serializer = self.get_serializer(elements, many=True)
        if (len(elements) > 0):
            return Response(serializer.data)
        else:
            return Response({'error': 'no encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['get'], url_path='brands')
    def filterBrand(self, request):
        return Response(vehicleService.brands())
    
    @action(detail=False, methods=['get'], url_path='vehicleFilter')
    def filterVehicle(self, request):
        
        query = """SELECT DISTINCT v.year, v.color, v.engine_info, 
        v.distance, v.plate, v.model, v.transmition 
        FROM autotaller_vehicle v
        INNER JOIN autotaller_customervehicle cv ON
        cv.vehicle_id =  v.plate"""
        year = request.GET.get('year')
        color = request.GET.get('color')
        transmition = request.GET.get('transmition')
        brand = str(request.GET.get('brand')) + "%"
        model = request.GET.get('model')
        customer = request.GET.get('customer')
        pars = []
        start = request.GET.get('start')
        order = request.GET.get('order')
        if (transmition != "" and transmition != None and transmition != "any"):
            query += " WHERE transmition = %s"
            pars.append(transmition)
        if (year != "" and year != None):
            query += " AND year = %s "
            pars.append(year)
        if (color != "" and color != None):
            query += "AND color = %s "
            pars.append(color)
        if(brand != "" and str(brand) != "any%" and brand != "None%"):
            query += " AND model ILIKE %s "
            pars.append(brand)
        if (model != "" and model != None):
            query += "AND model = %s"
            pars.append(model)
        if (customer != "" and customer != None):
            query += "AND cv.customer_id = %s"
            pars.append(customer)
        elements = vehicleService.objects().raw(query, pars)
        if (int(start) == 0):
            level = (len(elements) % int(order)) if len(elements) < int(order) else int(order)
        else:
            result = len(elements) - (int(order) * int(start))
            level = int(order) + (int(order) * int(start)) if result > int(order) else len(vehicleService.objects().raw(query, pars))
        data = vehicleService.objects().raw(query, pars)[(int(order) * int(start)) : level]
        serializer = self.get_serializer(data, many=True)
        return Response({
            'items' : serializer.data,
            'total' : len(vehicleService.objects().raw(query, pars))
        })
        
        