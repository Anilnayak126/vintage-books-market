from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    BookListView, BookDetailView, CreateBookView,
    UserBookListView, UserBookDetailView
)


urlpatterns = [
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('books/create/', CreateBookView.as_view(), name='create-book'),
    path('user/books/', UserBookListView.as_view(), name='user-book-list'),  
    path('user/books/<int:pk>/', UserBookDetailView.as_view(), name='user-book-detail'), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
