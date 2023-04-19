import json
from django.urls import reverse

def test_ping(client):

		## Given
		# Nada que manipular en la base de datos

		## When
    url = reverse("ping")
    response = client.get(url)
    content = json.loads(response.content)

		## Then
    assert response.status_code == 200
    assert content["ping"] == "pong!"