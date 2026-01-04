from rest_framework import serializers
from .models import Booking
from destination.models import Destination


class DestinationMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ("id", "title", "slug")


class BookingSerializer(serializers.ModelSerializer):
    # ✅ For CREATE / UPDATE (POST)
    destination = serializers.PrimaryKeyRelatedField(
        queryset=Destination.objects.all()
    )

    # ✅ For READ (GET)
    destination_details = DestinationMiniSerializer(
        source="destination",
        read_only=True
    )

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = (
            "id",
            "booking_reference",
            "status",
            "confirmation_token",
            "created_at",
        )
