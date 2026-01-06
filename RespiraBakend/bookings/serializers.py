from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    booking_reference = serializers.ReadOnlyField()
    # status = serializers.ReadOnlyField()

    class Meta:
        model = Booking
        fields = "__all__"
