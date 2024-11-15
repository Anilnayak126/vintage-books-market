from rest_framework import serializers
from .models import Book
from UserDetails.serializers import UserSerializer


class BookSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    class Meta:
        model = Book
        fields = ['id','title', 'author', 'description', 'price', 'created_at','image','genre', 'user']

    def validate_user(self, value):
        
        request = self.context.get('request')
        
        
        if request and request.method == 'POST':
            return value
        
        
        if request and request.user == value:
            raise serializers.ValidationError("You cannot buy your own product.")
        
        return value

