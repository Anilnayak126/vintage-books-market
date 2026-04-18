# Vintage Book Market

## Overview

**Vintage Book Market** is a web application where users can **buy and sell vintage books**, along with browsing and reviewing them. The project combines a marketplace flow with a Django REST API and a React frontend.

The project is developed using:

- **Django** and **Django Rest Framework (DRF)** for the backend
- **React**, **Vite**, and **Redux** for the frontend
- **Tailwind CSS** for responsive styling
- **PostgreSQL** for the Dockerized database

## Project Status

**Completed**

## Features

- Users can list books for sale with title, author, price, condition, and images.
- Users can browse books listed by other users.
- Shopping cart and wishlist flows are available.
- Authentication, profile management, and listed-book management are included.
- Search and filtering support book discovery.
- The app is responsive for mobile, tablet, and desktop devices.

## Run With Docker

From the repository root:

```bash
docker compose up --build
```

Then open:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- pgAdmin: http://localhost:8080

The frontend calls the backend through `/api`, and Nginx proxies those requests to the Django container.

## Environment

Copy the examples before running on a new machine:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Keep real secrets in `.env` files only. They are ignored by git and are injected by Docker Compose at runtime.

## Backend Only

From the `backend` folder:

```bash
docker compose up --build
```

## Frontend Stack From Frontend Folder

From the `frontend` folder:

```bash
docker compose up --build
```

The root compose file is the preferred way to run the full application.
