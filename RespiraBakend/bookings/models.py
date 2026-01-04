import uuid
from django.db import models
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.contrib.auth import get_user_model
from django.utils.html import strip_tags

from destination.models import Destination
from .utils import generate_password

User = get_user_model()


class Booking(models.Model):
    """
    Booking model for tour reservations.
    """

    # ======================
    # CONSTANTS / CHOICES
    # ======================
    STATUS_PENDING = "PENDING"
    STATUS_CONFIRMED = "CONFIRMED"
    STATUS_CANCELLED = "CANCELLED"

    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_CONFIRMED, "Confirmed"),
        (STATUS_CANCELLED, "Cancelled"),
    )

    PACKAGE_STANDARD = "standard"
    PACKAGE_PREMIUM = "premium"
    PACKAGE_VIP = "vip"

    PACKAGE_CHOICES = (
        (PACKAGE_STANDARD, "Standard"),
        (PACKAGE_PREMIUM, "Premium"),
        (PACKAGE_VIP, "VIP"),
    )

    # ======================
    # FIELDS
    # ======================
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    booking_reference = models.CharField(
        max_length=20,
        unique=True,
        editable=False,
        blank=True
    )

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)

    # ✅ RELATION TO DESTINATION
    destination = models.ForeignKey(
        Destination,
        on_delete=models.CASCADE,
        related_name="bookings",
        null=True,
        blank=True
    )

    date = models.DateField()
    number_of_people = models.PositiveIntegerField(default=1)

    package_type = models.CharField(
        max_length=20,
        choices=PACKAGE_CHOICES,
        default=PACKAGE_STANDARD
    )

    special_requests = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING
    )

    confirmation_token = models.UUIDField(
        default=uuid.uuid4,
        editable=False
    )

    created_at = models.DateTimeField(auto_now_add=True)

    # ======================
    # SAVE OVERRIDE
    # ======================
    def save(self, *args, **kwargs):
        """
        Handles:
        - Booking reference generation
        - Confirmation email trigger
        """
        is_new = self.pk is None

        previous_status = None
        if not is_new:
            previous_status = (
                Booking.objects
                .filter(pk=self.pk)
                .values_list("status", flat=True)
                .first()
            )

        if not self.booking_reference:
            self.booking_reference = f"BK-{uuid.uuid4().hex[:8].upper()}"

        super().save(*args, **kwargs)

        # Fire confirmation ONLY on status transition → CONFIRMED
        if previous_status != self.STATUS_CONFIRMED and self.status == self.STATUS_CONFIRMED:
            self._handle_confirmation()

    # ======================
    # CONFIRMATION LOGIC
    # ======================
    def _handle_confirmation(self):
        user = User.objects.filter(email=self.email).first()

        if user:
            self._send_existing_user_email()
        else:
            self._create_user_and_send_credentials()

    # ======================
    # NEW USER FLOW
    # ======================
    def _create_user_and_send_credentials(self):
        password = generate_password(6)

        User.objects.create_user(
            username=self.email,
            email=self.email,
            password=password
        )

        subject = "🎉 Booking Confirmed – Respira Zanzibar Tours & Safaris"

        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:8px;">
                <h2 style="color:#2e7d32;">Hello {self.full_name},</h2>

                <p>Your booking is <strong>CONFIRMED</strong> 🌴</p>

                <hr>
                <p><strong>Booking Ref:</strong> {self.booking_reference}</p>
                <p><strong>Destination:</strong> {self.destination.title}</p>
                <p><strong>Date:</strong> {self.date}</p>
                <p><strong>Guests:</strong> {self.number_of_people}</p>
                <hr>

                <h3>🔐 Login Details</h3>
                <p><strong>Email:</strong> {self.email}</p>
                <p><strong>Password:</strong> {password}</p>

                <p style="color:red;">Please change your password after login.</p>

                <p>We can’t wait to welcome you to Zanzibar 🌊</p>
            </div>
        </body>
        </html>
        """

        self._send_email(subject, html_content)

    # ======================
    # EXISTING USER FLOW
    # ======================
    def _send_existing_user_email(self):
        subject = "✅ Booking Confirmed – Welcome Back 🌴"

        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:8px;">
                <h2>Welcome back {self.full_name} 😊</h2>

                <p>Your booking has been <strong>CONFIRMED</strong>.</p>

                <hr>
                <p><strong>Booking Ref:</strong> {self.booking_reference}</p>
                <p><strong>Destination:</strong> {self.destination.title}</p>
                <p><strong>Date:</strong> {self.date}</p>
                <hr>

                <p>Thank you for choosing Respira again 🌍</p>
            </div>
        </body>
        </html>
        """

        self._send_email(subject, html_content)

    # ======================
    # EMAIL UTILITY
    # ======================
    def _send_email(self, subject, html_content):
        text_content = strip_tags(html_content)

        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[self.email],
        )
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)

    # ======================
    # STRING REPRESENTATION
    # ======================
    def __str__(self):
        return self.booking_reference
