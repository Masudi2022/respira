from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrCreateOnly(BasePermission):
    """
    - Anyone can CREATE a booking
    - Only admins can view/update/delete bookings
    """

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return request.user and request.user.is_staff
