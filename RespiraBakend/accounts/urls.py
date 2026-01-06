from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

from .views import LoginView, AdminUserViewSet, RegisterView

# =====================
# ADMIN USER ROUTER
# =====================
router = DefaultRouter()
router.register(r"users", AdminUserViewSet, basename="admin-users")

urlpatterns = [
    # =====================
    # AUTH
    # =====================
    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # =====================
    # OPEN REGISTER
    # =====================
    path("register/", RegisterView.as_view(), name="register"),

    # =====================
    # ADMIN USER MANAGEMENT
    # =====================
    path("", include(router.urls)),
]
