from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """
    - Anyone can READ (GET, HEAD, OPTIONS)
    - Only admin (is_staff=True) can WRITE (POST, PUT, PATCH, DELETE)
    """

    def has_permission(self, request, view):
        # Allow read-only methods for everyone
        if request.method in SAFE_METHODS:
            return True

        # Allow write methods only for authenticated admin users
        return (
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )
