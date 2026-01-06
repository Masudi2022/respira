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
    
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "is_active",
            "is_staff",
            "date_joined",
        ]
        read_only_fields = [
            "id",
            "username",
            "email",
            "date_joined",
        ]
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"},
    )
    email = serializers.EmailField(required=True)
    is_superuser = serializers.BooleanField(required=False, default=False)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "is_superuser"]

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        is_superuser = validated_data.pop("is_superuser", False)

        user = User(**validated_data)
        user.set_password(password)

        if is_superuser:
            user.is_superuser = True
            user.is_staff = True
        else:
            user.is_staff = False

        user.is_active = True
        user.save()
        return user

