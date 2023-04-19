from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )