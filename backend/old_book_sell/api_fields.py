from rest_framework import serializers

from .object_storage import build_file_url, get_file_key


class StoredImageField(serializers.ImageField):
    def to_representation(self, value):
        request = self.context.get('request')
        return build_file_url(value, request=request)


class StoredFileKeyField(serializers.Field):
    def to_representation(self, value):
        return get_file_key(value)
