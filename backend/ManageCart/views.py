from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import CartItem, WishlistItem
from .serializers import CartItemSerializer, WishlistItemSerializer
from rest_framework.pagination import PageNumberPagination

class  WishListPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param= 'page_size'
    max_page_size = 100


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            book = serializer.validated_data['book']
            
            if book.user == request.user:  
                return Response(
                    {"error": "You cannot add your own posted item to the cart."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            cart_item, created = CartItem.objects.update_or_create(
                user=request.user,
                book=book,
                defaults={'quantity': serializer.validated_data['quantity']}
            )
            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        book_id = request.data.get('book_id')
        if not book_id:
            return Response({"error": "Book ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = CartItem.objects.filter(user=request.user, book_id=book_id).first()
        if cart_item:
            cart_item.delete()
            return Response({"detail": "Item removed from cart."}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Item not found."}, status=status.HTTP_404_NOT_FOUND)



'''class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist_items = WishlistItem.objects.filter(user=request.user)
        serializer = WishlistItemSerializer(wishlist_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WishlistItemSerializer(data=request.data)
        if serializer.is_valid():
            book = serializer.validated_data['book']

            if book.user == request.user:  
                return Response(
                    {"error": "You cannot add your own posted item to the wishlist."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            wishlist_item, created = WishlistItem.objects.get_or_create(
                user=request.user,
                book=book
            )
            if not created:
                return Response({"detail": "Item already in wishlist."}, status=status.HTTP_400_BAD_REQUEST)
            return Response(WishlistItemSerializer(wishlist_item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        book_id = request.data.get('book_id')
        if not book_id:
            return Response({"error": "Book ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        wishlist_item = WishlistItem.objects.filter(user=request.user, book_id=book_id).first()
        if wishlist_item:
            wishlist_item.delete()
            return Response({"detail": "Item removed from wishlist."}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Item not found."}, status=status.HTTP_404_NOT_FOUND)
'''

class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist_items = WishlistItem.objects.filter(user=request.user)
        paginator = WishListPagination()
        paginated_items = paginator.paginate_queryset(wishlist_items,request)
        serializer = WishlistItemSerializer(paginated_items, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = WishlistItemSerializer(data=request.data)
        if serializer.is_valid():
            book = serializer.validated_data['book']

            if book.user == request.user:
                return Response(
                    {"error": "You cannot add your own posted item to the wishlist."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            wishlist_item, created = WishlistItem.objects.get_or_create(
                user=request.user,
                book=book
            )
            if not created:
                return Response({"detail": "Item already in wishlist."}, status=status.HTTP_400_BAD_REQUEST)
            return Response(WishlistItemSerializer(wishlist_item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        book_id = request.data.get('book_id')
        if not book_id:
            return Response({"error": "Book ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        wishlist_item = WishlistItem.objects.filter(user=request.user, book_id=book_id).first()
        if wishlist_item:
            wishlist_item.delete()
            return Response({"detail": "Item removed from wishlist."}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Item not found."}, status=status.HTTP_404_NOT_FOUND)