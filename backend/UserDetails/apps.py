# UserDetails/apps.py

from django.apps import AppConfig

class UserdetailsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'UserDetails'

    def ready(self):
        import UserDetails.signals
