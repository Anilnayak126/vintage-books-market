from django.urls import path
from .views import CartView, WishlistView

urlpatterns = [
    # Cart URLs
    path('cart/', CartView.as_view(), name='cart'),            # List and add items to cart
    path('cart/items/', CartView.as_view(), name='cart'),            # List and add items to cart
    path('cart/delete/', CartView.as_view(), name='cart-delete'),  # Remove item from cart

    # Wishlist URLs
    path('wishlist/', WishlistView.as_view(), name='wishlist'),      # List and add items to wishlist
    path('wishlist/items/', WishlistView.as_view(), name='wishlist'),      # List and add items to wishlist
    path('wishlist/delete/', WishlistView.as_view(), name='wishlist-delete'),  # Remove item from wishlist
]
