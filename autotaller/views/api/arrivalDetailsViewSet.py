from rest_framework import viewsets, status
from rest_framework.decorators import action
from ...services import arrivalDetailsService
from ...serializer import arrivalDetailsSerializer
from rest_framework.response import Response

class ArrivalDetailsViewSet(viewsets.ModelViewSet):
    queryset = arrivalDetailsService.objects()
    serializer_class = arrivalDetailsSerializer
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        model = arrivalDetailsService.getOrder()
        serializer = self.get_serializer(model, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='getArrivals')
    def getArrivals(self,request):
        data = arrivalDetailsService.objects().raw("""SELECT a.id, sp.name AS spare_name, ar."arrivalDate", 
        pv.name, ar.description, a.quantity 
        FROM autotaller_arrivaldetails AS a
        INNER JOIN autotaller_arrival AS ar
        ON ar."idArrival" = a.arrival_id
        INNER JOIN autotaller_spare as sp ON sp.code = a.spare_id
        INNER JOIN autotaller_provider as pv ON pv.code = ar.provider_id""")
        start = request.GET.get('start')
        order = request.GET.get('order')
        level = 0
        if (int(start) == 0):
            level = (len(data) % int(order)) if len(data) < int(order) else int(order)
        else:
            result = len(data) - (int(order) * int(start))
            level = int(order) + (int(order) * int(start)) if result > int(order) else len(data)
        elements = []
        for n in data:
            elements.append({
                "spare_name" : n.spare_name,
                "arrivalDate" : n.arrivalDate,
                "name" : n.name,
                "description" : n.description,
                "quantity": n.quantity
            })
        items = elements[(int(order) * int(start)) : level]
        return Response({
            'items' : items,
            'total' : len(data)
        })
    
    @action(detail=False, methods=['get'], url_path='removeArrive')
    def removeArrive(self, request):
        data = request.GET.get('spare')
        arrivals = arrivalDetailsService.objects().filter(spare=data).values_list('arrival', flat=True).distinct()
        total, elements = arrivalDetailsService.removeArrive(arrivals)
        return Response({
            'total' : total,
            'status' : status.HTTP_204_NO_CONTENT
        })
    
    @action(detail=False, methods=['get'], url_path='getById')
    def getById(self, request):
        identifier = request.GET.get('arrival')
        data = arrivalDetailsService.getByIdArriv(identifier)
        serializer = arrivalDetailsSerializer(data, many=False, context={'request': request})
        if (identifier is not None):
            return Response(serializer.data)
        else:
            return Response({'error' : 'no arrival found'}, status=status.HTTP_403_FORBIDDEN)
        
    @action(detail=False, methods=['get'], url_path="arrivalFilter")
    def getByFilters(self, request):
        pars = []
        minQuantity = request.GET.get('minQuantity')
        maxQuantity = request.GET.get('maxQuantity')
        spare = request.GET.get('spare')
        dateFrom = request.GET.get('dateFrom')
        dateTo = request.GET.get('dateTo')
        provider = request.GET.get('provider')
        query = """SELECT a.id, sp.name AS spare_name, ar."arrivalDate", pv.name, ar.description, a.quantity FROM autotaller_arrivaldetails AS a
        INNER JOIN autotaller_arrival AS ar
        ON ar."idArrival" = a.arrival_id
        INNER JOIN autotaller_spare as sp ON sp.code = a.spare_id
        INNER JOIN autotaller_provider as pv ON pv.code = ar.provider_id"""
        if (int(minQuantity) > 0):
            query += " WHERE a.quantity >= %s AND a.quantity <= %s"
            pars.append(minQuantity)
            pars.append(maxQuantity)
        if (spare != None and spare != ""):
            query += "  AND sp.name = %s"
            pars.append(spare)
        if (dateFrom != None and dateFrom != ""):
            query += ' AND ar."arrivalDate" >= %s'
            pars.append(dateFrom)
        if (dateTo != None and dateTo != ""):
            query += ' AND ar."arrivalDate" <= %s'
            pars.append(dateTo)
        if (provider != None and provider != ""):
            query += " AND pv.name = %s"
            pars.append(provider)
        dat = arrivalDetailsService.objects().raw(query, pars)
        start = request.GET.get('start')
        order = request.GET.get('order')
        level = 0
        if (int(start) == 0):
            level = (len(dat) % int(order)) if len(dat) < int(order) else int(order)
        else:
            result = len(dat) - (int(order) * int(start))
            level = int(order) + (int(order) * int(start)) if result > int(order) else len(dat)
        elements = dat[(int(order) * int(start)) : level]
        data = []
        for n in elements:
            data.append({
                "spare_name" : n.spare_name,
                "arrivalDate" : n.arrivalDate,
                "name" : n.name,
                "description" : n.description,
                "quantity": n.quantity
            })
        return Response({
            'items' : data,
            #la longitud la lista completa no la seccionada
            'total' : len(dat)
        })
        
                    