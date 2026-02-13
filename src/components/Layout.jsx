import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "220px",
          background: "#0f172a",
          color: "#e2e8f0",
          padding: "1.5rem 0",
        }}
      >
        <div style={{ padding: "0 1.25rem", marginBottom: "1.5rem" }}>
          <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>After.noon</span>
          <span style={{ fontSize: "0.75rem", display: "block", color: "#94a3b8" }}>
            Admin
          </span>
        </div>
        <nav>
          <Link
            to="/"
            style={{
              display: "block",
              padding: "0.6rem 1.25rem",
              color: "#cbd5e1",
              fontSize: "0.9rem",
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/products"
            style={{
              display: "block",
              padding: "0.6rem 1.25rem",
              color: "#cbd5e1",
              fontSize: "0.9rem",
            }}
          >
            Products
          </Link>
          <Link
            to="/users"
            style={{
              display: "block",
              padding: "0.6rem 1.25rem",
              color: "#cbd5e1",
              fontSize: "0.9rem",
            }}
          >
            Users
          </Link>
          <Link
            to="/inquiries"
            style={{
              display: "block",
              padding: "0.6rem 1.25rem",
              color: "#cbd5e1",
              fontSize: "0.9rem",
            }}
          >
            Inquiries
          </Link>
        </nav>
      </aside>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: "56px",
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 1.5rem",
          }}
        >
          <span style={{ marginRight: "1rem", fontSize: "0.9rem", color: "#64748b" }}>
            {user?.name || user?.email}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: "0.4rem 0.75rem",
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "0.875rem",
            }}
          >
            Logout
          </button>
        </header>
        <main style={{ flex: 1, padding: "1.5rem", overflow: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
