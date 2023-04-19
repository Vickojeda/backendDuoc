from django.shortcuts import render

from app.dulceTulipanes.serializers import UsuarioSerializer
from .models import Usuario

def index(request):
    return render(request, '../web/login.html')

def menuAdmin(request, mail):
    usuario = Usuario.objects.filter(mail=mail).first()
    context ={
        'nombre' : usuario.nombre,
        'apellido' : usuario.apellido,
        'direccion' : usuario.direccion,
        'rut_usuario' : usuario.rut_usuario,
        'numero_telefono' : usuario.numero_telefono,
        'mail' : usuario.mail,
        'contrasena' : usuario.contrasena
         }
    return render(request, '../web/html/menuAdmin.html',context)

def menu(request, mail):
    usuario = Usuario.objects.filter(mail=mail).first()
    context ={
        'nombre' : usuario.nombre,
        'apellido' : usuario.apellido,
        'direccion' : usuario.direccion,
        'rut_usuario' : usuario.rut_usuario,
        'numero_telefono' : usuario.numero_telefono,
        'mail' : usuario.mail,
        'contrasena' : usuario.contrasena
         }
    return render(request, '../web/html/menu.html',context)

def registerUser(request):
    return render(request, '../web/html/registerUser.html')

def recoveryPass(request):
    return render(request, '../web/html/recoveryPass.html')