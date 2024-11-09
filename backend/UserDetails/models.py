from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # Your custom fields for the user model can go here if any
    pass

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, related_name="user_profile", on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.user.username}"
