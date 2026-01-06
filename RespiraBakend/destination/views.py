from rest_framework.viewsets import ModelViewSet
from .models import Destination
from .serializers import DestinationSerializer
from .permissions import IsAdminOrReadOnly


class DestinationViewSet(ModelViewSet):
    serializer_class = DestinationSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "slug"

    def get_queryset(self):
        # Only show active destinations to everyone
        return Destination.objects.filter(is_active=True)
