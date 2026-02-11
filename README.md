# Admin Dashboard | After.noon

Separate frontend app for the After.noon e-commerce admin. Uses the **same backend** as the store (`e-commerce-backend`).

## Setup

1. **Backend** must be running (e.g. `cd e-commerce-backend && npm run dev`).
2. Create `.env` from `.env.example` and set `VITE_API_URL` if your API is not at `http://localhost:5000/api`.
3. Install and run:

```bash
npm install
npm run dev
```

Runs at **http://localhost:3001** by default.

## Making a user an admin

The backend expects users with `role: "admin"`. From the backend folder run:

```bash
npm run set-admin -- your-admin@example.com
```

Or in MongoDB Compass / shell: find the user and set `role` to `"admin"`.

## Features

- **Login** – Only users with `role: "admin"` can sign in.
- **Dashboard** – Simple home with product count.
- **Products** – List, add, edit, delete products (uses existing backend product CRUD with admin-only protection).

Product create/update/delete are protected by the backend; only admin users can perform them.
# afternoon-admin
