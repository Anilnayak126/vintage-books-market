# Vintage Book Selling Backend

Docker support is configured for local development with Django, PostgreSQL, pgAdmin, and an optional MinIO service.

## Run Backend Only

From this `backend` folder:

```bash
docker compose up --build
```

Backend URLs:

- Django API: http://localhost:8000
- PostgreSQL: localhost:5432
- pgAdmin: http://localhost:8080
- MinIO Console: http://localhost:9001

## Run Full App

From the repository root, use the root compose file instead:

```bash
docker compose up --build
```

Then open:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- pgAdmin: http://localhost:8080

## Environment Files

Local secrets and machine-specific settings live in `.env`. Use `.env.example` as the template:

```bash
cp .env.example .env
```

Keep real secrets out of source control. The Docker image does not copy `.env`; Compose injects it at runtime.

## Useful Commands

```bash
docker compose logs -f backend
docker compose exec backend python manage.py createsuperuser
docker compose down
docker compose down -v
```
