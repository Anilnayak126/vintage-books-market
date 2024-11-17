from rest_framework import serializers
from .models import CartItem, WishlistItem
from ManageProducts.models import Book
from ManageProducts.serializers import BookSerializer 

class CartItemSerializer(serializers.ModelSerializer):
    
    bookdetails = BookSerializer(source='book', read_only=True)  
    
    class Meta:
        model = CartItem
        fields = ['id', 'user', 'book', 'quantity', 'added_at', 'bookdetails']
        read_only_fields = ['user', 'added_at']

class WishlistItemSerializer(serializers.ModelSerializer):
    bookdetails = BookSerializer(source='book', read_only=True)  
    
    class Meta:
        model = WishlistItem
        fields = ['id', 'user', 'book', 'added_at', 'bookdetails']
        read_only_fields = ['user', 'added_at']
