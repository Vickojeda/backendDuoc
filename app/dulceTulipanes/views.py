from __future__ import print_function
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UsuarioSerializer
from .models import Usuario

def ping(request):
    data = {"ping": "pong!"}
    return JsonResponse(data)

class UsuariosList(APIView):

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        usuarios = Usuario.objects.all().order_by('created_at')
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UsuariosDetails(APIView):
    def post(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        usuario = Usuario.objects.filter(mail=email, contrasena=password).first()
        serializer = UsuarioSerializer(usuario)
        print("ACA")
        print(usuario)
        if usuario:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(email, status=status.HTTP_404_NOT_FOUND)
        

    def get(self, request, mail):
        usuario = Usuario.objects.filter(mail=mail).first()
        serializer = UsuarioSerializer(usuario)
            
        if usuario:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({mail}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, mail):
        usuario = Usuario.objects.filter(mail=mail).first()
        if usuario:
            serializer = UsuarioSerializer(usuario)
            usuario.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, numeroDocumento): 
        usuario = Usuario.objects.filter(rut_usuario=numeroDocumento).first()
        serializer = UsuarioSerializer(usuario, data=request.data)
        if usuario and serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)