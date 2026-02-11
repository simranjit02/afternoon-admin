import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem 2.5rem",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.5rem", color: "#1e293b" }}>
          Admin Dashboard
        </h1>
        <p style={{ margin: "0 0 1.5rem", color: "#64748b", fontSize: "0.9rem" }}>
          After.noon
        </p>
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                padding: "0.75rem",
                marginBottom: "1rem",
                background: "#fef2f2",
                color: "#b91c1c",
                borderRadius: "6px",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </div>
          )}
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "#374151" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.625rem 0.75rem",
              marginBottom: "1rem",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "#374151" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.625rem 0.75rem",
              marginBottom: "1.25rem",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#0f172a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: 500,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#94a3b8" }}>
          Only users with admin role can access.
        </p>
      </div>
    </div>
  );
}
