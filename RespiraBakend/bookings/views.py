from rest_framework.viewsets import ModelViewSet
from .models import Booking
from .serializers import BookingSerializer
from .permissions import IsAdminOrCreateOnly


class BookingViewSet(ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAdminOrCreateOnly]
    lookup_field = "id"  # UUID lookup

    def get_queryset(self):
        """
        - Admins see all bookings
        - Others see nothing (POST only)
        """
        user = self.request.user

        if user.is_authenticated and user.is_staff:
            return Booking.objects.select_related("destination").all()

        return Booking.objects.none()
