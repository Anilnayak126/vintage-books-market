<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=120&color=0:092E20,100:111827&text=Vintage%20Book%20Market%20API&fontColor=ffffff&fontSize=34" alt="Vintage Book Market API banner" />

  <p>
    <img src="https://img.shields.io/badge/Django-5.1-092E20?logo=django&logoColor=white" alt="Django" />
    <img src="https://img.shields.io/badge/DRF-REST%20API-red?logo=django&logoColor=white" alt="Django REST Framework" />
    <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Gunicorn-WSGI-499848?logo=gunicorn&logoColor=white" alt="Gunicorn" />
    <img src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
    <img src="https://img.shields.io/badge/PayPal-Sandbox-00457C?logo=paypal&logoColor=white" alt="PayPal" />
  </p>
</div>

# Backend

This folder contains the Django REST Framework backend for Vintage Book Market. It handles authentication, user profiles, book listings, cart items, wishlist items, MinIO-backed media uploads, and PayPal sandbox order creation.

## Backend Stack

| Area | Tooling |
| --- | --- |
| Framework | Django 5.1.2 |
| API | Django REST Framework |
| Auth | Simple JWT |
| Database | PostgreSQL via `psycopg2-binary` |
| Runtime | Gunicorn |
| CORS | `django-cors-headers` |
| Config | `python-dotenv` and runtime environment variables |
| Media | Django `ImageField` backed by MinIO object storage with presigned URLs |
| Payments | PayPal sandbox API via server-side credentials |

## Apps

| Django app | Purpose | Main data |
| --- | --- | --- |
| `UserDetails` | Registration, login, profile, password changes | `CustomUser`, `UserProfile` |
| `ManageProducts` | Book listing, book detail, seller book management | `Book` |
| `ManageCart` | Cart, wishlist, PayPal checkout | `CartItem`, `WishlistItem` |
| `old_book_sell` | Project settings and root URLs | Django project package |

## Run Backend With Docker

From this `backend` folder:

```bash
docker compose up --build
```

Backend services:

| Service | URL |
| --- | --- |
| Django API | http://localhost:8000 |
| Django admin | http://localhost:8000/admin |
| PostgreSQL | `localhost:5432` |
| MinIO API | http://localhost:9000 |
| pgAdmin | http://localhost:8080 |
| MinIO console | http://localhost:9001 |

The root project compose file is preferred when running frontend and backend together:

```bash
cd ..
docker compose up --build
```

## Environment

Create a local `.env` file from the template:

```bash
cp .env.example .env
```

Keep real values in `.env` only. The `.env` file is ignored by git.

| Variable | Example | Purpose |
| --- | --- | --- |
| `DEBUG` | `True` | Enables Django debug mode for local development |
| `SECRET_KEY` | `change-me` | Django secret key |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1,backend` | Hosts allowed by Django |
| `DB_NAME` | `vintage_books` | PostgreSQL database name |
| `DB_USER` | `postgres` | PostgreSQL user |
| `DB_PASSWORD` | `postgres` | PostgreSQL password |
| `DB_HOST` | `postgres` | Database host inside Docker |
| `DB_PORT` | `5432` | Database port |
| `MEDIA_ROOT` | `/app/media` | Local fallback media path when object storage is disabled |
| `STATIC_ROOT` | `/app/staticfiles` | Container path for collected static files |
| `OBJECT_STORAGE_ENABLED` | `True` | Toggle MinIO-backed object storage |
| `MINIO_ENDPOINT` | `http://minio:9000` | Internal MinIO endpoint used by the backend |
| `MINIO_PUBLIC_ENDPOINT` | `http://localhost:9000` | Public endpoint used for browser presigned URLs |
| `MINIO_ACCESS_KEY` | `minioadmin` | MinIO access key |
| `MINIO_SECRET_KEY` | `minioadmin` | MinIO secret key |
| `MINIO_BUCKET_NAME` | `vintage-books-media` | Bucket that stores book and profile images |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000,http://localhost:5173` | Allowed browser origins |
| `PAYPAL_CLIENT_ID` | sandbox client id | PayPal sandbox client id |
| `PAYPAL_CLIENT_SECRET` | sandbox secret | PayPal sandbox secret |

## Media Storage Behavior

- Uploaded book images and profile images are stored as private objects in MinIO.
- The database stores only the object key, for example `book_images/cover.png`.
- API responses include both:
  - `image` or `profile_image`: a presigned URL for direct browser access
  - `image_key` or `profile_image_key`: the stored object key
- The backend creates the configured bucket at startup with `python manage.py ensure_storage_bucket`.

## API Endpoint Reference

The frontend uses these endpoints through `/api/...` in Docker. Direct backend URLs start at `http://localhost:8000`.

### User and Auth

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/userDetails/register/` | Public | Register a new user |
| `POST` | `/userDetails/login/` | Public | Log in and receive JWT tokens |
| `POST` | `/userDetails/logout/` | User | Logout and blacklist refresh token |
| `GET` | `/userDetails/profile/` | User | Get authenticated user profile |
| `PATCH` | `/userDetails/edit-profile/` | User | Update profile and profile image |
| `POST` | `/userDetails/change-password/` | User | Change password |
| `POST` | `/userDetails/token/` | Public | Obtain JWT pair |
| `POST` | `/userDetails/token/refresh/` | Public | Refresh access token |

### Books

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/manage_p/books/` | Public | List books with pagination/search/filter params |
| `GET` | `/manage_p/books/<id>/` | Optional | Read one book |
| `POST` | `/manage_p/books/create/` | User | Create a book listing |
| `GET` | `/manage_p/user/books/` | User | List books owned by current user |
| `GET` | `/manage_p/user/books/<id>/` | User | Get one owned listing |
| `PUT` | `/manage_p/user/books/<id>/` | User | Update one owned listing |
| `DELETE` | `/manage_p/user/books/<id>/` | User | Delete one owned listing |

### Cart, Wishlist, and Payment

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/manage_c/cart/` | User | Get current user's cart |
| `POST` | `/manage_c/cart/` | User | Add or update a cart item |
| `DELETE` | `/manage_c/cart/delete/` | User | Remove a cart item |
| `POST` | `/manage_c/cart/paypal-payment/` | User | Create a PayPal sandbox order |
| `GET` | `/manage_c/wishlist/` | User | Get current user's wishlist |
| `POST` | `/manage_c/wishlist/` | User | Add a wishlist item |
| `DELETE` | `/manage_c/wishlist/delete/` | User | Remove a wishlist item |

## Data Model Summary

| Model | Important fields | Notes |
| --- | --- | --- |
| `CustomUser` | Django user fields | Extends `AbstractUser` |
| `UserProfile` | `phone_number`, `address`, `profile_image` | One-to-one with user |
| `Book` | `title`, `author`, `description`, `price`, `image`, `genre`, `user` | Seller owns each listing |
| `CartItem` | `user`, `book`, `quantity`, `added_at` | Unique per user/book |
| `WishlistItem` | `user`, `book`, `added_at` | Unique per user/book |

## Useful Commands

| Task | Command |
| --- | --- |
| Start backend stack | `docker compose up --build` |
| Start in background | `docker compose up --build -d` |
| Show backend logs | `docker compose logs -f backend` |
| Ensure storage bucket exists | `docker compose exec backend python manage.py ensure_storage_bucket` |
| Run migrations | `docker compose exec backend python manage.py migrate` |
| Create superuser | `docker compose exec backend python manage.py createsuperuser` |
| Open Django shell | `docker compose exec backend python manage.py shell` |
| Stop containers | `docker compose down` |
| Reset backend database volume | `docker compose down -v` |

## Local Python Setup

Use Docker for the most reliable setup. For local Python development:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Payment Notes

PayPal credentials are loaded from `backend/.env`:

```env
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_secret
```

The current backend uses PayPal sandbox URLs. Switch to production URLs and production credentials only when the app is ready for real payments.

## Security Checklist

- Do not commit `backend/.env`.
- Do not commit PayPal secrets.
- Keep `DEBUG=False` in production.
- Rotate any credentials that were ever pushed publicly.
- Keep uploaded media, MinIO data, and local database files out of git.
