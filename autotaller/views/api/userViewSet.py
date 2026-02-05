from rest_framework import viewsets, status
import json
from rest_framework.response import Response
from rest_framework.decorators import action
from ...services import UserService
from ...serializer import registerUserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserService.objects()
    serializer_class = registerUserSerializer
    
    #POST api/usuario/
    def create(self, request, *args, **kwargs):
        a = json.loads(request.body)
        user = UserService.create(a['userName'],a['name'], a['id_card'], a['mail'])
        user.set_password(a['password'])
        user.save()
        return Response({'created':  'succesfully'}, status=status.HTTP_200_OK)
    
    #GET api/usuario/creado/?usuario=
    @action(detail=False, methods=['get'], url_path='created')
    def registrado(self, request):
        user1 = request.GET.get('userName')
        user = UserService.find(user=user1)
        if user is not None:
            return Response({'welcome' : True}, status=status.HTTP_200_OK)
        else:
            return Response({'error' : 'sus credenciales no corresponden'}, status=status.HTTP_403_FORBIDDEN)
    