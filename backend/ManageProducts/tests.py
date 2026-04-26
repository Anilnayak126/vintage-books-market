from unittest.mock import patch

from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from ManageProducts.models import Book
from UserDetails.models import CustomUser, UserProfile


@override_settings(OBJECT_STORAGE_ENABLED=True)
class BookApiStorageTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username='seller',
            email='seller@example.com',
            password='strong-password-123',
        )
        UserProfile.objects.create(user=self.user)

    @patch(
        'old_book_sell.object_storage.generate_presigned_file_url',
        side_effect=lambda key: f'http://localhost:9000/vintage-books-media/{key}?signature=test',
    )
    def test_book_list_returns_presigned_image_url_and_key(self, _mock_presign):
        Book.objects.create(
            title='Vintage Testing',
            author='A. Writer',
            description='A classic test fixture.',
            price='12.50',
            image='book_images/vintage-testing.jpg',
            user=self.user,
        )

        response = self.client.get('/manage_p/books/')

        self.assertEqual(response.status_code, 200)
        payload = response.json()['results'][0]
        self.assertEqual(payload['image_key'], 'book_images/vintage-testing.jpg')
        self.assertEqual(
            payload['image'],
            'http://localhost:9000/vintage-books-media/book_images/vintage-testing.jpg?signature=test',
        )
