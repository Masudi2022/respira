from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Booking
from .serializers import BookingSerializer
from .emails import send_booking_emails
from .permissions import IsAdminUserOnly


# ==============================
# CREATE BOOKING (PUBLIC)
# ==============================
class BookingCreateView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        booking = serializer.save()
        send_booking_emails(booking)


# ==============================
# LIST BOOKINGS
# ==============================
class BookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff or user.is_superuser:
            return (
                Booking.objects
                .select_related("destination")
                .order_by("-created_at")
            )

        return (
            Booking.objects
            .filter(email=user.email)
            .select_related("destination")
            .order_by("-created_at")
        )


# ==============================
# CONFIRM BOOKING (ADMIN ONLY)
# ==============================
class BookingConfirmView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAdminUserOnly]
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        booking = self.get_object()

        if booking.status == "CONFIRMED":
            return Response(
                {"detail": "Booking is already confirmed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = "CONFIRMED"
        booking.save()

        # Optional: send confirmation email
        send_booking_emails(booking)

        return Response(
            {"detail": "Booking confirmed successfully."},
            status=status.HTTP_200_OK
        )


# ==============================
# CANCEL BOOKING (ADMIN ONLY)
# ==============================
class BookingCancelView(generics.UpdateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAdminUserOnly]
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        booking = self.get_object()

        if booking.status == "CANCELLED":
            return Response(
                {"detail": "Booking is already cancelled."},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = "CANCELLED"
        booking.save()

        # Optional: send cancellation email
        send_booking_emails(booking)

        return Response(
            {"detail": "Booking cancelled successfully."},
            status=status.HTTP_200_OK
        )


# ==============================
# DELETE BOOKING (ADMIN ONLY)
# ==============================
class BookingDeleteView(generics.DestroyAPIView):
    queryset = Booking.objects.all()
    permission_classes = [IsAdminUserOnly]
    lookup_field = "id"
