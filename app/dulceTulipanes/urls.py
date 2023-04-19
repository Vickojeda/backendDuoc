from django.urls import path
from app.dulceTulipanes.views import *
from app.dulceTulipanes.login import index, menu, menuAdmin, registerUser, recoveryPass

urlpatterns = [
    path("ping/", ping, name="ping"),
    path("api/usuarios/", UsuariosList.as_view()),
    path("api/usuarios/<str:numeroDocumento>/", UsuariosDetails.as_view()),
    path("api/login/", UsuariosDetails.as_view()),
    path("index/", index),
    path("menuAdmin/<str:mail>/", menuAdmin),
    path("menu/<str:mail>/", menu),
    path("registerUser/", registerUser),
    path("recoveryPass/", recoveryPass),
]