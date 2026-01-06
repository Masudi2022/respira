from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import (
    EmailTokenObtainPairSerializer,
    AdminUserSerializer,
    RegisterSerializer,
)

User = get_user_model()


# ============================
# LOGIN VIEW
# ============================
class LoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


# ============================
# ADMIN USER MANAGEMENT
# ============================
class AdminUserViewSet(ModelViewSet):
    """
    Admin-only user management
    """
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]
    queryset = User.objects.all().order_by("-date_joined")


# ============================
# OPEN REGISTER VIEW
# ============================
class RegisterView(APIView):
    """
    OPEN registration (learning only)
    - Anyone can create user
    - Anyone can create superuser
    """
    permission_classes = [AllowAny]
    authentication_classes = []  # 🔥 VERY IMPORTANT

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message": "User created successfully",
                    "username": user.username,
                    "is_superuser": user.is_superuser,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
