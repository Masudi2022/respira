from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from .models import Booking
from .serializers import BookingSerializer



from django.http import HttpResponse

def home(request):
    return HttpResponse("Respira Backend is running ✅")



class BookingCreateAPIView(APIView):

    def post(self, request):
        serializer = BookingSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        booking = serializer.save()

        # ==================================================
        # TOURIST EMAIL (HTML)
        # ==================================================
        subject = "Booking Received 🏝️"
        from_email = settings.EMAIL_HOST_USER
        to = [booking.email]

        text_content = "Your booking has been received."

        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Booking Received 🏝️</h2>
            <p>Hello <strong>{booking.full_name}</strong>,</p>

            <p>Thank you for booking with us.</p>

            <p>
                <strong>Tour:</strong> {booking.tour}<br/>
                <strong>Phone:</strong> {booking.phone}
            </p>

            <p>Status: <strong style="color: orange;">PENDING</strong></p>

            <p>We will confirm your booking shortly.</p>

            <br/>
            <p>Regards,<br/>
            <strong>Zanzibar Team</strong></p>
        </body>
        </html>
        """

        email = EmailMultiAlternatives(subject, text_content, from_email, to)
        email.attach_alternative(html_content, "text/html")
        email.send()

        # ==================================================
        # ADMIN CONFIRMATION LINK
        # ==================================================
        confirm_url = request.build_absolute_uri(
            reverse(
                "confirm-booking",
                args=[booking.id, booking.confirmation_token],
            )
        )

        # ==================================================
        # ADMIN EMAIL (HTML + BUTTON)
        # ==================================================
        subject = "New Booking – Confirmation Required"
        to = [settings.ADMIN_EMAIL]

        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>New Booking Received</h2>

            <p><strong>Name:</strong> {booking.full_name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
            <p><strong>Tour:</strong> {booking.tour}</p>
            <p><strong>Message:</strong> {booking.message}</p>

            <br/>

            <a href="{confirm_url}"
               style="
               background-color:#28a745;
               color:white;
               padding:14px 28px;
               text-decoration:none;
               font-weight:bold;
               border-radius:6px;
               display:inline-block;">
               ✅ Confirm Booking
            </a>

            <br/><br/>
            <p>This booking is currently <strong>PENDING</strong>.</p>
        </body>
        </html>
        """

        email = EmailMultiAlternatives(subject, text_content, from_email, to)
        email.attach_alternative(html_content, "text/html")
        email.send()

        return Response(
            {"message": "Booking created. HTML emails sent."},
            status=status.HTTP_201_CREATED,
        )


def confirm_booking(request, booking_id, token):
    booking = get_object_or_404(
        Booking,
        id=booking_id,
        confirmation_token=token,
    )

    if booking.status == "CONFIRMED":
        return HttpResponse("<h3>Booking already confirmed ✅</h3>")

    booking.status = "CONFIRMED"
    booking.save()

    # ==================================================
    # CONFIRMATION EMAIL TO TOURIST (HTML)
    # ==================================================
    subject = "Booking Confirmed 🎉"
    from_email = settings.EMAIL_HOST_USER
    to = [booking.email]

    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <h2 style="color: green;">Booking Confirmed 🎉</h2>

        <p>Hello <strong>{booking.full_name}</strong>,</p>

        <p>Your booking has been <strong>CONFIRMED</strong>.</p>

        <p>
            <strong>Tour:</strong> {booking.tour}<br/>
            <strong>Phone:</strong> {booking.phone}
        </p>

        <p>We look forward to welcoming you!</p>

        <br/>
        <p>Best regards,<br/>
        <strong>Zanzibar Team</strong></p>
    </body>
    </html>
    """

    email = EmailMultiAlternatives(subject, "", from_email, to)
    email.attach_alternative(html_content, "text/html")
    email.send()

    return HttpResponse("""
        <h2>Booking Confirmed ✅</h2>
        <p>The tourist has been notified by email.</p>
    """)
