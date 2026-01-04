from django.core.mail import send_mail
from django.conf import settings


def send_booking_emails(booking):
    destination_title = (
        booking.destination.title
        if booking.destination
        else "N/A"
    )

    # ============================
    # EMAIL TO CUSTOMER
    # ============================
    customer_subject = "Your Booking with Respira Zanzibar Tours & Safaris"

    customer_message = f"""
Hello {booking.full_name},

Thank you for booking with Respira Zanzibar Tours & Safaris 🌴

Here are your booking details:

Booking Reference: {booking.booking_reference}
Destination: {destination_title}
Date: {booking.date}
Guests: {booking.number_of_people}
Package: {booking.package_type}

We will contact you shortly to confirm your booking.

You can view your booking anytime using this secure link:
http://localhost:3000/booking/{booking.confirmation_token}

Warm regards,
Respira Zanzibar Tours & Safaris
"""

    send_mail(
        subject=customer_subject,
        message=customer_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[booking.email],
        fail_silently=False,
    )

    # ============================
    # EMAIL TO ADMIN
    # ============================
    admin_subject = "New Booking Request Received"

    admin_message = f"""
A new booking has been received:

Reference: {booking.booking_reference}
Name: {booking.full_name}
Email: {booking.email}
Destination: {destination_title}
Date: {booking.date}
Guests: {booking.number_of_people}
Package: {booking.package_type}
"""

    send_mail(
        subject=admin_subject,
        message=admin_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.ADMIN_EMAIL],
        fail_silently=False,
    )
