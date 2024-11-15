from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book
from rest_framework.permissions import AllowAny
from .serializers import BookSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q


# List all books
'''class BookListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)'''

class BookPagination(PageNumberPagination):
    page_size = 10  # Number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 100

class BookListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Query parameters for search and filter
        search_term = request.query_params.get('search', '')  # Search term for title, author, etc.
        condition = request.query_params.get('condition', None)  # Filter by condition (e.g., new or used)
        min_price = request.query_params.get('min_price', None)  # Minimum price filter
        max_price = request.query_params.get('max_price', None)  # Maximum price filter
        
        # Base query: get all books
        books = Book.objects.all()

        # Apply search filters
        if search_term:
            books = books.filter(
                Q(title__icontains=search_term) |  # Search in title
                Q(author__icontains=search_term) |  # Search in author
                Q(description__icontains=search_term)  # Search in description
            )

        # Apply condition filter (if you have such a field)
        if condition:
            books = books.filter(condition__icontains=condition)

        # Apply price range filter
        if min_price:
            books = books.filter(price__gte=min_price)
        if max_price:
            books = books.filter(price__lte=max_price)
        

        # Paginate results
        paginator = BookPagination()
        paginated_books = paginator.paginate_queryset(books, request)
        
        # Serialize the data
        serializer = BookSerializer(paginated_books, many=True)
        
        # Return paginated response
        return paginator.get_paginated_response(serializer.data)


'''class BookListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Query parameters for search and filter
        search_term = request.query_params.get('search', '')  # Search term for title, author, etc.
        condition = request.query_params.get('condition', None)  # Filter by condition (e.g., new or used)
        min_price = request.query_params.get('min_price', None)  # Minimum price filter
        max_price = request.query_params.get('max_price', None)  # Maximum price filter
        genre = request.query_params.get('genre', None)  # Genre filter
        sort_by = request.query_params.get('sort_by', 'title')  # Sort field, default is 'title'

        # Base query: get all books
        books = Book.objects.all()

        # Apply search filters
        if search_term:
            books = books.filter(
                Q(title__icontains=search_term) |
                Q(author__icontains=search_term) |
                Q(description__icontains=search_term)
            )

        # Apply condition filter
        if condition:
            books = books.filter(condition__icontains=condition)

        # Apply price range filters
        if min_price:
            books = books.filter(price__gte=min_price)
        if max_price:
            books = books.filter(price__lte=max_price)

        # Apply genre filter
        if genre:
            books = books.filter(genre__iexact=genre)

        # Apply sorting
        if sort_by and sort_by in ['title', 'price', 'author']:  # Validate sort_by field
            books = books.order_by(sort_by)
        else:
            books = books.order_by('title')  # Default sorting

        # Debugging SQL query
        print(str(books.query))  # Log the generated SQL query for debugging

        # Paginate results
        paginator = BookPagination()
        paginated_books = paginator.paginate_queryset(books, request)

        # Serialize the data
        serializer = BookSerializer(paginated_books, many=True)

        # Return paginated response
        return paginator.get_paginated_response(serializer.data)
'''
# View details of a specific book (requires authentication for full details)
class BookDetailView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookSerializer(book)
        return Response(serializer.data)

# Create a new book listing (requires authentication)
class CreateBookView(APIView):

    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''class CreateBookView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        # Pass the request context to the serializer
        serializer = BookSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            # Assign the authenticated user as the book owner
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''

# List all books created by the authenticated user
class UserBookListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        books = Book.objects.filter(user=request.user)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

# Edit or delete a book owned by the authenticated user
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
