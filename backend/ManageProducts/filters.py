# filters.py
import django_filters
from .models import Book

class BookFilter(django_filters.FilterSet):
    # Filtering by title (case-insensitive)
    title = django_filters.CharFilter(lookup_expr='icontains', label='Title')
    # Filtering by author (case-insensitive)
    author = django_filters.CharFilter(lookup_expr='icontains', label='Author')
    # Filtering by price range (min and max price)
    price_min = django_filters.NumberFilter(field_name='price', lookup_expr='gte', label='Min Price')
    price_max = django_filters.NumberFilter(field_name='price', lookup_expr='lte', label='Max Price')
    # Filtering by description (case-insensitive)
    description = django_filters.CharFilter(lookup_expr='icontains', label='Description')
    # Filtering by creation date (after or before a specific date)
    created_at_min = django_filters.DateTimeFilter(field_name='created_at', lookup_expr='gte', label='Created After')
    created_at_max = django_filters.DateTimeFilter(field_name='created_at', lookup_expr='lte', label='Created Before')

    class Meta:
        model = Book
        fields = ['title', 'author', 'price_min', 'price_max', 'description', 'created_at_min', 'created_at_max']
