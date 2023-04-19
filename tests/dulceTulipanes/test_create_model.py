import pytest

from app.dulceTulipanes.models import Usuarios

@pytest.mark.django_db
def test_usuario_model():

    ## Given
    # Creamos un nuevo usuario en la base de datos
    usuario = Usuarios(
        nombre="Victoria",
        apellido="Ojeda",
        direccion="Huascar",
        rut="161041599",
        numero_telefono=986980410,
        mail="vaoc85@hotmail.com",
        contrasena="Maite1411!!!",
    )
    usuario.save()

    ## When

    ## Then
    assert usuario.nombre == "Victoria"
    assert usuario.apellido == "Ojeda"
    assert usuario.direccion == "Huascar"
    assert usuario.rut == "161041599"
    assert usuario.numero_telefono == 986980410
    assert usuario.mail == "vaoc85@hotmail.com"
    assert usuario.contrasena == "Maite1411!!!"
    assert usuario.created_at
    assert usuario.updated_at
    assert str(usuario) == usuario.nombre