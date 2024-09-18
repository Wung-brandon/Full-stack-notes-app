from django.db import models
from accounts.models import User

# Create your models here.

class Note(models.Model):
    CATEGORY = (
        ("BUSINESS", "Business"),
        ("IMPORTANT", "Important"),
        ("PERSONAL", "Personal")
    )
    title = models.CharField(max_length=150)
    body = models.TextField()
    category = models.CharField(choices=CATEGORY, default="Personal", max_length=100)
    created_by = models.ForeignKey(to=User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
