from decimal import Decimal
from app.dulceTulipanes.serializers import UsuarioSerializer

def test_valid_usuario_serializer():
    valid_serializer_data = {
        "nombre": "Victoria",
        "apellido": "Ojeda",
        "direccion": "Huascar",
        "rut": "161041599",
        "numero_telefono": "9869803112",
        "mail": "vaoc85@hotmail.com",
        "contrasena": "password",
    }
    serializer = UsuarioSerializer(data=valid_serializer_data)
    assert serializer.is_valid()
    assert serializer.validated_data == valid_serializer_data
    assert serializer.data == valid_serializer_data
    assert serializer.errors == {}

def test_invalid_usuario_serializer():
    invalid_serializer_data = {
        "nombre": "Victoria",
        "apellido": "Ojeda",
    }
    serializer = UsuarioSerializer(data=invalid_serializer_data)
    assert not serializer.is_valid()
    assert serializer.validated_data == {}
    assert serializer.data == invalid_serializer_data
    assert serializer.errors == {
        "direccion": ["This field is required."],
        "rut": ["This field is required."],
        "numero_telefono": ["This field is required."],
        "mail": ["This field is required."],
        "contrasena": ["This field is required."],
    }