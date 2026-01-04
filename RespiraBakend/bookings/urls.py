from django.urls import path
from .views import (
    BookingCreateView,
    BookingListView,
    BookingConfirmView,
    BookingCancelView,
    BookingDeleteView,
)

urlpatterns = [
    path("bookings/", BookingCreateView.as_view(), name="booking-create"),
    path("bookings/my-bookings/", BookingListView.as_view(), name="booking-list"),

    # ADMIN ACTIONS
    path("bookings/<int:id>/confirm/", BookingConfirmView.as_view(), name="booking-confirm"),
    path("bookings/<int:id>/cancel/", BookingCancelView.as_view(), name="booking-cancel"),
    path("bookings/<int:id>/delete/", BookingDeleteView.as_view(), name="booking-delete"),
]
