from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book
from rest_framework.permissions import AllowAny
from .serializers import BookSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q



class BookPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 100

class UserBookPagination(PageNumberPagination):
    page_size = 3  
    page_size_query_param = 'page_size'
    max_page_size = 10  

class BookListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        search_term = request.query_params.get('search', '') 
        condition = request.query_params.get('condition', None)  
        min_price = request.query_params.get('min_price', None) 
        max_price = request.query_params.get('max_price', None)  
        
        books = Book.objects.all()

        if search_term:
            books = books.filter(
                Q(title__icontains=search_term) |  # Search in title
                Q(author__icontains=search_term) |  # Search in author
                Q(description__icontains=search_term)  # Search in description
            )

        if condition:
            books = books.filter(condition__icontains=condition)

        if min_price:
            books = books.filter(price__gte=min_price)
        if max_price:
            books = books.filter(price__lte=max_price)
        

        paginator = BookPagination()
        paginated_books = paginator.paginate_queryset(books, request)
        
        serializer = BookSerializer(paginated_books, many=True)
        
        return paginator.get_paginated_response(serializer.data)


class BookDetailView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookSerializer(book)
        return Response(serializer.data)

class CreateBookView(APIView):

    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserBookListView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         books = Book.objects.filter(user=request.user)
#         serializer = BookSerializer(books, many=True)
#         return Response(serializer.data)


class UserBookListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        books = Book.objects.filter(user=request.user)  # Get books of the logged-in user
        
        paginator = UserBookPagination()
        paginated_books = paginator.paginate_queryset(books, request)  # Apply pagination

        serializer = BookSerializer(paginated_books, many=True)  # Serialize paginated results
        return paginator.get_paginated_response(serializer.data)  # Return paginated response


class UserBookDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Book.objects.get(pk=pk, user=user)
        except Book.DoesNotExist:
            return None

    def get(self, request, pk):
        book = self.get_object(pk, request.user)
        if not book:
            return Response({"detail": "Not found or you do not have permission."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BookSerializer(book)
        return Response(serializer.data)

    def put(self, request, pk):
        book = self.get_object(pk, request.user)
        if not book:
            return Response({"detail": "Not found or you do not have permission."}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        book = self.get_object(pk, request.user)
        if not book:
            return Response({"detail": "Not found or you do not have permission."}, status=status.HTTP_404_NOT_FOUND)

        book.delete()
        return Response({"detail": "Book deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
