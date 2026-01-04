from rest_framework import generics
from .models import Destination
from .serializers import DestinationSerializer


class DestinationListAPIView(generics.ListAPIView):
    queryset = Destination.objects.filter(is_active=True)
    serializer_class = DestinationSerializer


class DestinationDetailAPIView(generics.RetrieveAPIView):
    queryset = Destination.objects.filter(is_active=True)
    serializer_class = DestinationSerializer
    lookup_field = "slug"
