import pytest
from app.dulceTulipanes.models import Usuarios


@pytest.mark.django_db
def test_add_usuario(client):
    # Given
    usuarios = Usuarios.objects.all()
    assert len(usuarios) == 0

    # When
    resp = client.post(
        "/api/usuarios/",
        {
            "nombre": "Victoria",
            "apellido": "Ojeda",
            "direccion": "Huascar",
            "rut": "161041599",
            "numero_telefono": "9869803112",
            "mail": "vaoc85@hotmail.com",
            "contrasena": "password",
        },
        content_type="application/json"
    )

    # Then
    assert resp.status_code == 201
    assert resp.data["nombre"] == "Victoria"

    usuarios = Usuarios.objects.all()
    assert len(usuarios) == 1


@pytest.mark.django_db
def test_get_single_user(client):

    usuario = Usuarios.objects.create(
        nombre="Victoria",
        apellido="Ojeda",
        direccion="Huascar",
        rut="161041599",
        numero_telefono="9869803112",
        mail="vaoc85@hotmail.com",
        contrasena="password",
    )

    resp = client.get(f"/api/usuarios/{usuario.mail}/")

    # Then
    assert resp.status_code == 200
    assert resp.data["nombre"] == "Victoria"


@pytest.mark.django_db
def test_get_single_usuario_incorrect_id(client):

    resp = client.get(f"/api/usuarios/vv@gmail.com/")

    assert resp.status_code == 404


@pytest.mark.django_db
def test_get_all_usuarios(client, faker):

    def create_random_usuario():
        return Usuarios.objects.create(
            nombre=faker.name(),
            apellido=faker.name(),
            direccion=faker.name(),
            rut=faker.name(),
            numero_telefono=faker.name(),
            mail=faker.name(),
            contrasena=faker.name(),
        )

    usuario_1 = create_random_usuario()
    usuario_2 = create_random_usuario()

    # When
    resp = client.get(f"/api/usuarios/")

    # Then
    assert resp.status_code == 200
    assert resp.data[0]["nombre"] == usuario_1.nombre
    assert resp.data[1]["nombre"] == usuario_2.nombre


@pytest.mark.django_db
def test_remove_usuario(client):

    usuario = Usuarios.objects.create(
        nombre="Victoria",
        apellido="Ojeda",
        direccion="Huascar",
        rut="161041599",
        numero_telefono="9869803112",
        mail="vaoc85@hotmail.com",
        contrasena="password",
    )
    # Check exist
    resp_detail = client.get(f"/api/usuarios/{usuario.mail}/")
    assert resp_detail.status_code == 200
    assert resp_detail.data["nombre"] == "Victoria"

    # When
    resp_delete = client.delete(f"/api/usuarios/{usuario.mail}/")
    resp_list = client.get("/api/usuarios/")
    rest_new_detail = client.get(f"/api/usuarios/{usuario.mail}/")

    # Then
    assert resp_delete.status_code == 200

    assert resp_delete.data["nombre"] == "Victoria"

    assert resp_list.status_code == 200

    assert len(resp_list.data) == 0

    assert rest_new_detail.status_code == 404


@pytest.mark.django_db
def test_remove_usuario_incorrect_id(client):
    # Given
    usuario = Usuarios.objects.create(
        nombre="Victoria",
        apellido="Ojeda",
        direccion="Huascar",
        rut="161041599",
        numero_telefono="9869803112",
        mail="vaoc85@hotmail.com",
        contrasena="password",
    )

    # When
    resp = client.delete(f"/api/usuarios/vv@gmail.com/")

    # Then
    assert resp.status_code == 404


@pytest.mark.django_db
def test_update_usuario(client):

    usuario = Usuarios.objects.create(
        nombre="Victoria",
        apellido="Ojeda",
        direccion="Huascar",
        rut="161041599",
        numero_telefono="9869803112",
        mail="vaoc85@hotmail.com",
        contrasena="password",
    )

    # When
    resp = client.put(
        f"/api/usuarios/{usuario.mail}/",
        {
            "nombre": "Alejandra",
            "apellido": "Concha",
            "direccion": "Huascar",
            "numero_telefono": "989897766",
        },
        content_type="application/json"
    )

    # Then
    assert resp.status_code == 200
    assert resp.data["nombre"] == "Alejandra"
    assert resp.data["apellido"] == "Concha"
    assert resp.data["direccion"] == "Huascar"
    assert resp.data["numero_telefono"] == "989897766"

    resp_detail = client.get(f"/api/usuarios/{usuario.mail}/")
    assert resp_detail.status_code == 200
    assert resp_detail.data["nombre"] == "Alejandra"
    assert resp_detail.data["apellido"] == "Concha"
    assert resp_detail.data["direccion"] == "Huascar"
    assert resp_detail.data["numero_telefono"] == "989897766"


@pytest.mark.django_db
def test_update_cliente_incorrect_mail(client):
    resp = client.put(f"/api/usuarios/vv@gmail.com/")
    assert resp.status_code == 404


@pytest.mark.django_db
def test_update_client_invalid_json(client):

    usuario = Usuarios.objects.create(
        nombre="Victoria",
        apellido="Ojeda",
        direccion="Huascar",
        rut="161041599",
        numero_telefono="9869803112",
        mail="vaoc85@hotmail.com",
        contrasena="password",
    )

    # When
    resp = client.put(
        f"/api/usuarios/{usuario.mail}/",
        {
            "foo": "Dune",
            "boo": "Ciencia Ficción",
        },
        content_type="application/json"
    )

    # Then
    assert resp.status_code == 400
