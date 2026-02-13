# Admin Dashboard

React (Vite) admin UI for the Afternoon e‑commerce project: products, users, and inquiries.

## Prerequisites

- **Node.js** v18+ (or v16+)
- Backend API running (see [e-commerce-backend/README.md](../e-commerce-backend/README.md))
- An admin user (set via backend: `npm run set-admin -- user@example.com` or set `role: "admin"` in MongoDB)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. API URL (optional)

The dashboard uses **http://localhost:5001/api** by default.

To override:

```env
VITE_API_URL=http://localhost:5001/api
```

Use a `.env` file in this folder or set the variable before running.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |

## Running the dashboard

```bash
npm run dev
```

The app runs at **http://localhost:3001**.

Log in with an account that has **admin** role. Ensure the **backend** is running on port 5001 (or the URL you set).

## Features

- **Dashboard** – Overview: product count, user/admin counts, inquiry counts (reviewed/pending)
- **Products** – List, add, edit, delete; click row for detail
- **Users** – List, add user, change role, enable/disable, delete
- **Inquiries** – List contact form submissions; click row for detail; mark as reviewed/pending
