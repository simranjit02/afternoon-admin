import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_PRODUCTS, API_USERS, API_INQUIRIES } from "../config/api";
import { useAuth } from "../context/AuthContext";

const cardStyle = {
  background: "#fff",
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  border: "1px solid #f1f5f9",
  minWidth: "200px",
  flex: "1 1 200px",
  maxWidth: "280px",
};

const labelStyle = { fontSize: "0.8125rem", color: "#64748b", marginBottom: "0.5rem" };
const countStyle = { fontSize: "1.75rem", fontWeight: 700, color: "#0f172a" };
const subStyle = { fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.5rem" };
const linkStyle = { fontSize: "0.8125rem", color: "#0f172a", marginTop: "0.5rem", fontWeight: 500 };

export default function Dashboard() {
  const { authHeader } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    admins: 0,
    inquiries: 0,
    inquiriesReviewed: 0,
    inquiriesPending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = authHeader();
    Promise.all([
      axios.get(API_PRODUCTS, { headers }).then((res) => (Array.isArray(res.data) ? res.data : [])),
      axios.get(API_USERS, { headers }).then((res) => (Array.isArray(res.data) ? res.data : [])),
      axios.get(API_INQUIRIES, { headers }).then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        return list;
      }),
    ])
      .then(([products, users, inquiries]) => {
        const admins = users.filter((u) => u.role === "admin").length;
        const reviewed = inquiries.filter((i) => i.reviewed === true).length;
        setStats({
          products: products.length,
          users: users.length,
          admins,
          inquiries: inquiries.length,
          inquiriesReviewed: reviewed,
          inquiriesPending: inquiries.length - reviewed,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <h1 style={{ margin: "0 0 1.5rem", fontSize: "1.5rem", color: "#1e293b" }}>Dashboard</h1>
        <div style={{ color: "#64748b" }}>Loading…</div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ margin: "0 0 1.5rem", fontSize: "1.5rem", color: "#1e293b" }}>
        Dashboard
      </h1>
      <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <div style={labelStyle}>Products</div>
          <div style={countStyle}>{stats.products}</div>
          <div style={subStyle}>Total products</div>
          <Link to="/products" style={linkStyle}>
            Manage products →
          </Link>
        </div>

        <div style={cardStyle}>
          <div style={labelStyle}>Users</div>
          <div style={countStyle}>{stats.users}</div>
          <div style={subStyle}>
            {stats.admins} admin{stats.admins !== 1 ? "s" : ""}, {stats.users - stats.admins} user{stats.users - stats.admins !== 1 ? "s" : ""}
          </div>
          <Link to="/users" style={linkStyle}>
            Manage users →
          </Link>
        </div>

        <div style={cardStyle}>
          <div style={labelStyle}>Inquiries</div>
          <div style={countStyle}>{stats.inquiries}</div>
          <div style={subStyle}>
            <span style={{ color: "#166534" }}>{stats.inquiriesReviewed} reviewed</span>
            {" · "}
            <span style={{ color: "#92400e" }}>{stats.inquiriesPending} pending</span>
          </div>
          <Link to="/inquiries" style={linkStyle}>
            View inquiries →
          </Link>
        </div>
      </div>
    </div>
  );
}
