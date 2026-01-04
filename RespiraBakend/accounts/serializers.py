from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user

        if user.is_superuser:
            role = "admin"
        elif user.is_staff:
            role = "staff"
        else:
            role = "user"

        data["user"] = {
            "username": user.username,
            "email": user.email,
            "role": role,
        }

        return data
