from django.urls import path
from .views import CartView, WishlistView,PayPalPaymentView

urlpatterns = [
    # Cart URLs
    path('cart/', CartView.as_view(), name='cart'),            
    path('cart/items/', CartView.as_view(), name='cart'),           
    path('cart/delete/', CartView.as_view(), name='cart-delete'),  

    # Wishlist URLs
    path('wishlist/', WishlistView.as_view(), name='wishlist'),      
    path('wishlist/items/', WishlistView.as_view(), name='wishlist'),    
    path('wishlist/delete/', WishlistView.as_view(), name='wishlist-delete'),  
     
    # PayMent Urls
     path('cart/paypal-payment/', PayPalPaymentView.as_view(), name='paypal_payment'),

]
