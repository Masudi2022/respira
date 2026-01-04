from django.db import models
from django.utils.text import slugify
import uuid


class Destination(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # URL-safe identifier (used in frontend routing)
    slug = models.SlugField(max_length=200, unique=True)

    title = models.CharField(max_length=200)
    location = models.CharField(max_length=200)

    image = models.URLField()
    description = models.TextField()

    highlight = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)
    best_time = models.CharField(max_length=100)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["title"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
