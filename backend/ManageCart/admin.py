from django.contrib import admin
from .models import CartItem,WishlistItem

# Register your models here.

admin.site.register(CartItem)
admin.site.register(WishlistItem)
