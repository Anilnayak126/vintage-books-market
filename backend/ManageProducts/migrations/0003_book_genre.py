# Generated by Django 5.1.2 on 2024-11-15 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ManageProducts', '0002_book_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='genre',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
