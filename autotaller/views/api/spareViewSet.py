from rest_framework import viewsets, status
from rest_framework.decorators import action
from ...services import spareService
from ...serializer import spareSerializer
from rest_framework.response import Response
    
class SpareViewSet(viewsets.ModelViewSet):
    #obtener la lista de todos los repuestos en la db 
    serializer_class = spareSerializer
    queryset = spareService.objects()
    
    def list(self, request, *args, **kwargs):
        start = self.request.GET.get('start')
        order = self.request.GET.get('order')
        level = 0
        if (int(start) == 0):
            level = (spareService.objects().count() % int(order)) if spareService.objects().count() < int(order) else int(order)
        else:
            result = spareService.objects().count() - (int(order) * int(start))
            level = int(order) + (int(order) * int(start)) if result > int(order) else spareService.objects().count()
        items = spareService.objects()[(int(order) * int(start)) : level]
        return Response({
            'items' : spareSerializer(items, many=True).data,
            'total' : spareService.objects().count()  
        })
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'], url_path="getByname")
    def getName(self, request):
        nam = request.GET.get('name')
        name = spareService.firstName(nam)
        serializer = spareSerializer(name,many=False, context={'request': request})
        if (name is not None):
           return Response(serializer.data)
        else:
            return Response({'error' : 'no register found'}, status=status.HTTP_403_FORBIDDEN)
        
    @action(detail=False,methods=['get'], url_path="getByCategorie")
    def getByCategorie(self, request):
        categ = request.GET.get('categorie')
        name = request.GET.get('name')
        elements = spareService.orderByCategorie(categ, name)
        serializer = spareSerializer(elements, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path="spareFilter")
    def filterSpare(self, request):
        start = request.GET.get('start')
        order = request.GET.get('order')
        minPrice = request.GET.get('minPrice')
        maxPrice = request.GET.get('maxPrice')
        categorie = request.GET.get('categorie')
        typeCategorie = request.GET.get('typeCategorie')
        pars = [typeCategorie, categorie]
        query = """SELECT * FROM autotaller_spare AS sp INNER JOIN autotaller_categorie as c
        ON c.id = sp.categorie_id WHERE c.type = %s AND c.name = %s"""
        if (minPrice != None and float(minPrice) > 0.00):
            query += "AND sp.price >= %s AND sp.price <= %s"
            pars.append(minPrice)
            pars.append(maxPrice)
        elements = spareService.objects().raw(query, pars)
        level = 0
        if (int(start) == 0):
            level = (len(elements) % int(order)) if len(elements) < int(order) else int(order)
        else:
            result = len(elements) - (int(order) * int(start))
            level = int(order) + (int(order) * int(start)) if result > int(order) else len(elements)
        items = elements[(int(order) * int(start)) : level]
        serializer = spareSerializer(elements, many=True)
        return Response({
            'items' : serializer.data,
            'total' : len(elements)
        })
        