# UserDetails/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import UserProfile



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    """Save the associated UserProfile when the CustomUser is saved"""
    if hasattr(instance, 'userprofile'):
        instance.userprofile.save()
