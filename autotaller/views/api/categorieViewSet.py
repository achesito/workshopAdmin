from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from ...services import categorieService
from ...serializer import categorieSerializer

class CategorieViewSet(viewsets.ModelViewSet):
    queryset = categorieService.objects()
    serializer_class = categorieSerializer
    
    def list(self, request, *args, **kwargs):
        start = request.GET.get('start')
        order = request.GET.get('order')
        level = 0
        if (int(start) == 0):
            level = (categorieService.objects().count() % int(order)) if categorieService.objects().count() < int(order) else int(order)
        else:
            result = categorieService.objects().count() - (int(order) * int(start))
            level = int(order) + (int(order) * int(start)) if result > int(order) else categorieService.objects().count()
        items = categorieService.objects()[(int(order) * int(start)) : level]
        return Response({
            'items' : categorieSerializer(items, many=True).data,
            'total' : categorieService.objects().count()  
        })
    
    @action(detail=False, methods=['get'], url_path='getByName')
    def getByName(self, request):
        name = request.GET.get('name')
        identifier = categorieService.getByName(name)
        serializer = categorieSerializer(identifier, many=False, context={'request': request})
        if (identifier is not None):
            return Response(serializer.data)
        else:
            return Response({'error' : 'no categorie named like this'}, status=status.HTTP_403_FORBIDDEN)
    
    
    @action(detail=False, methods=['get'], url_path='getInitials')
    def getByInitials(self, request):
        name = request.GET.get('name')
        length = 0
        if (len(categorieService.getByInitials(name)) < 20):
            length = len(categorieService.getByInitials(name))
        else:
            length = 20
        elements = categorieService.getByInitials(name)[0:length]
        serializer = categorieSerializer(elements, many=True, context={'request': request})
        if (len(elements) > 0):
            return Response(serializer.data)
        else:
            return Response({'error' : 'no data found'}, status=status.HTTP_400_BAD_REQUEST)
            
    @action(detail=False, methods=['get'], url_path="categories")
    def categories(self, request):
        data = categorieService.getTypes()
        return Response(data)
