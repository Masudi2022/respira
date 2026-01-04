from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Destination


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "is_active")
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("is_active",)
    search_fields = ("title", "location")
