from django.urls import path
from .views import BookingCreateAPIView, confirm_booking, home

urlpatterns = [
    path("", home, name="home"),
    path("booking/", BookingCreateAPIView.as_view(), name="create-booking"),
    path(
        "confirm-booking/<uuid:booking_id>/<uuid:token>/",
        confirm_booking,
        name="confirm-booking",
    ),
]
