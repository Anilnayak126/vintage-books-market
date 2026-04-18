<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&height=120&color=0:111827,100:38bdf8&text=Vintage%20Book%20Market%20Frontend&fontColor=ffffff&fontSize=32" alt="Vintage Book Market frontend banner" />

  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=111827" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux&logoColor=white" alt="Redux Toolkit" />
    <img src="https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Nginx-Proxy-009639?logo=nginx&logoColor=white" alt="Nginx" />
  </p>
</div>

# Frontend

This folder contains the React/Vite frontend for Vintage Book Market. It provides the browser UI for authentication, browsing books, selling books, profile management, cart, wishlist, and PayPal checkout redirects.

## Frontend Stack

| Area | Tooling |
| --- | --- |
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | React Router DOM |
| State | Redux Toolkit, React Redux |
| API client | Axios |
| Styling | Tailwind CSS, styled-components |
| Motion/UI | Framer Motion, React Icons, Heroicons, loading skeletons |
| Production server | Nginx |

## Run With Docker

Preferred full-app command from the repository root:

```bash
docker compose up --build
```

Frontend-only stack from this folder:

```bash
docker compose up --build
```

Open:

| Service | URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |

## Local Development

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Build production files:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Environment

Create a local `.env` from the template:

```bash
cp .env.example .env
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `/api` | Browser-facing base path for API calls |
| `VITE_API_PROXY_TARGET` | `http://localhost:8000` | Vite dev server proxy target |
| `VITE_APP_NAME` | `Vintage Books Market` | App display/config name |
| `VITE_APP_VERSION` | `1.0.0` | App version metadata |

In Docker production, the React app calls `/api/...`. Nginx proxies that path to the Django backend container.

## Page Routes

| Route | Screen | Purpose |
| --- | --- | --- |
| `/` | Home | Main entry page |
| `/browse` | Browse Books | Browse and search book listings |
| `/books/:id` | Book Details | View one listing and seller details |
| `/sell` | Sell Book | Create a new listing |
| `/manage_books/:id` | Manage Book | Edit or delete one owned listing |
| `/cart` | Cart | View cart and start checkout |
| `/account` | My Account | Profile, listed books, wishlist, settings |
| `/login` | Login | User login |
| `/register` | Register | User signup |
| `/edit-profile` | Edit Profile | Update profile information |
| `/change-password` | Change Password | Update password |
| `/payment-success` | Payment Success | Payment success status screen |
| `/payment-failed` | Payment Failed | Payment failure status screen |
| `/term&C` | Terms and Conditions | Static policy page |
| `/privacy` | Privacy Policy | Static policy page |

## Feature Map

| Feature | Main files | Notes |
| --- | --- | --- |
| API URL handling | `src/config/api.js` | Centralizes API and media URLs |
| Authentication state | `src/redux/authSlice.js` | Handles login, register, profile, logout, token refresh |
| Book state | `src/redux/booksSlice.js` | Handles browse, create, update, delete, detail views |
| Cart state | `src/redux/cartSlice.js` | Handles cart fetch/add/delete and PayPal checkout start |
| Wishlist state | `src/redux/wishlistSlice.js` | Handles wishlist pagination, add, delete |
| Routing | `src/App.jsx` | Declares SPA routes |
| Production proxy | `nginx.conf` | Serves React and proxies `/api` to Django |

## API Flow

```mermaid
flowchart LR
  UI[React components] --> Redux[Redux thunks]
  Redux --> Axios[Axios]
  Axios --> ApiBase[/api]
  ApiBase --> Nginx[Nginx proxy]
  Nginx --> Django[Django REST API]
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build production assets |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Docker Notes

The frontend Docker image uses a multi-stage build:

| Stage | Purpose |
| --- | --- |
| `node:18-alpine` | Installs dependencies with `npm ci` and runs `npm run build` |
| `nginx:alpine` | Serves `dist/` and proxies API requests |

Production container port:

```text
3000 on host -> 80 in frontend container
```

## Troubleshooting

| Problem | Fix |
| --- | --- |
| API calls fail in Docker | Make sure frontend uses `VITE_API_BASE_URL=/api` and backend service is running |
| API calls fail in Vite dev | Make sure backend is running on `http://localhost:8000` |
| Images do not load | Confirm backend media files are available and the API returns valid media paths |
| Build fails after dependency changes | Run `npm install` locally or rebuild Docker with `docker compose build frontend` |
