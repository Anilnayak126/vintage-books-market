import os
import shutil
from io import BytesIO
from pathlib import Path
from unittest.mock import patch

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from PIL import Image
from rest_framework.test import APIClient

from UserDetails.models import CustomUser, UserProfile


@override_settings(OBJECT_STORAGE_ENABLED=True)
class UserProfileStorageTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='reader',
            email='reader@example.com',
            password='strong-password-123',
        )
        UserProfile.objects.create(
            user=self.user,
            phone_number='1234567890',
            address='42 Test Street',
            profile_image='profile_images/reader-avatar.png',
        )
        self.client.force_authenticate(user=self.user)

    @patch(
        'old_book_sell.object_storage.generate_presigned_file_url',
        side_effect=lambda key: f'http://localhost:9000/vintage-books-media/{key}?signature=test',
    )
    def test_profile_endpoint_returns_presigned_profile_image_and_key(self, _mock_presign):
        response = self.client.get('/userDetails/profile/')

        self.assertEqual(response.status_code, 200)
        profile_data = response.json()['user']['user_profile']
        self.assertEqual(profile_data['profile_image_key'], 'profile_images/reader-avatar.png')
        self.assertEqual(
            profile_data['profile_image'],
            'http://localhost:9000/vintage-books-media/profile_images/reader-avatar.png?signature=test',
        )


class EditUserProfileTests(TestCase):
    def setUp(self):
        self.media_root = Path(os.getcwd()) / 'test_media' / 'edit-profile-tests'
        self.media_root.mkdir(parents=True, exist_ok=True)
        self.override = override_settings(
            OBJECT_STORAGE_ENABLED=False,
            MEDIA_ROOT=str(self.media_root),
            STORAGES={
                'default': {
                    'BACKEND': 'django.core.files.storage.FileSystemStorage',
                    'OPTIONS': {
                        'location': str(self.media_root),
                        'base_url': '/media/',
                    },
                },
                'staticfiles': {
                    'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage',
                },
            },
        )
        self.override.enable()

        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='editor',
            email='editor@example.com',
            password='strong-password-123',
            first_name='Old',
        )
        UserProfile.objects.create(
            user=self.user,
            phone_number='1111111111',
            address='Old Address',
            profile_image='profile_images/old-avatar.png',
        )
        self.client.force_authenticate(user=self.user)

    def tearDown(self):
        self.override.disable()
        shutil.rmtree(self.media_root, ignore_errors=True)

    @staticmethod
    def build_test_image(name='avatar.png', color=(0, 0, 255)):
        buffer = BytesIO()
        image = Image.new('RGB', (1, 1), color)
        image.save(buffer, format='PNG')
        buffer.seek(0)
        return SimpleUploadedFile(name, buffer.read(), content_type='image/png')

    def test_edit_profile_updates_profile_image_and_profile_fields(self):
        upload = self.build_test_image(name='new-avatar.png')

        response = self.client.patch(
            '/userDetails/edit-profile/',
            {
                'first_name': 'New',
                'phone_number': '9999999999',
                'address': 'New Address',
                'profile_image': upload,
            },
            format='multipart',
        )

        self.assertEqual(response.status_code, 200)

        self.user.refresh_from_db()
        self.user.user_profile.refresh_from_db()

        self.assertEqual(self.user.first_name, 'New')
        self.assertEqual(self.user.user_profile.phone_number, '9999999999')
        self.assertEqual(self.user.user_profile.address, 'New Address')
        self.assertIn('new-avatar', self.user.user_profile.profile_image.name)
        self.assertNotEqual(self.user.user_profile.profile_image.name, 'profile_images/old-avatar.png')

        payload = response.json()['user']['user_profile']
        self.assertEqual(payload['phone_number'], '9999999999')
        self.assertEqual(payload['address'], 'New Address')
        self.assertIn('new-avatar', payload['profile_image_key'])
