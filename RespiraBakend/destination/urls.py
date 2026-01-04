from django.urls import path
from .views import (
    DestinationListAPIView,
    DestinationDetailAPIView,
)

urlpatterns = [
    path("destinations/", DestinationListAPIView.as_view(), name="destination-list"),
    path(
        "destinations/<slug:slug>/",
        DestinationDetailAPIView.as_view(),
        name="destination-detail",
    ),
]
