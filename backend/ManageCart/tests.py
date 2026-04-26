from unittest.mock import patch

from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from ManageCart.models import CartItem
from ManageProducts.models import Book
from UserDetails.models import CustomUser, UserProfile


@override_settings(OBJECT_STORAGE_ENABLED=True)
class CartStorageTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.seller = CustomUser.objects.create_user(
            username='seller',
            email='seller@example.com',
            password='strong-password-123',
        )
        UserProfile.objects.create(user=self.seller)

        self.buyer = CustomUser.objects.create_user(
            username='buyer',
            email='buyer@example.com',
            password='strong-password-123',
        )
        UserProfile.objects.create(user=self.buyer)

        self.book = Book.objects.create(
            title='Cart Fixture',
            author='Fixture Author',
            description='Stored in cart for API verification.',
            price='19.99',
            image='book_images/cart-fixture.jpg',
            user=self.seller,
        )
        CartItem.objects.create(user=self.buyer, book=self.book, quantity=2)
        self.client.force_authenticate(user=self.buyer)

    @patch(
        'old_book_sell.object_storage.generate_presigned_file_url',
        side_effect=lambda key: f'http://localhost:9000/vintage-books-media/{key}?signature=test',
    )
    def test_cart_endpoint_returns_nested_presigned_book_image(self, _mock_presign):
        response = self.client.get('/manage_c/cart/')

        self.assertEqual(response.status_code, 200)
        payload = response.json()[0]['bookdetails']
        self.assertEqual(payload['image_key'], 'book_images/cart-fixture.jpg')
        self.assertEqual(
            payload['image'],
            'http://localhost:9000/vintage-books-media/book_images/cart-fixture.jpg?signature=test',
        )

    def test_cart_delete_accepts_book_id_query_param(self):
        response = self.client.delete(f'/manage_c/cart/?book_id={self.book.id}')

        self.assertEqual(response.status_code, 204)
        self.assertFalse(CartItem.objects.filter(user=self.buyer, book=self.book).exists())
