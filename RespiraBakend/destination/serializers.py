from rest_framework import serializers
from .models import Destination


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = [
            "id",
            "slug",
            "title",
            "location",
            "image",
            "description",
            "highlight",
            "duration",
            "best_time",
        ]
