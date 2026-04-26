from rest_framework import serializers
from .models import Book
from UserDetails.serializers import UserSerializer
from old_book_sell.api_fields import StoredFileKeyField, StoredImageField


class BookSerializer(serializers.ModelSerializer):
    image = StoredImageField(required=False, allow_null=True)
    image_key = StoredFileKeyField(source='image', read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'author',
            'description',
            'price',
            'created_at',
            'image',
            'image_key',
            'genre',
            'user',
        ]

    def validate_user(self, value):
        request = self.context.get('request')

        if request and request.method == 'POST':
            return value

        if request and request.user == value:
            raise serializers.ValidationError("You cannot buy your own product.")

        return value

