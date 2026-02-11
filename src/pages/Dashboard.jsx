import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_PRODUCTS } from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { authHeader } = useAuth();
  const [stats, setStats] = useState({ products: 0 });

  useEffect(() => {
    axios
      .get(API_PRODUCTS, { headers: authHeader() })
      .then((res) => setStats({ products: res.data?.length ?? 0 }))
      .catch(() => setStats({ products: 0 }));
  }, []);

  return (
    <div>
      <h1 style={{ margin: "0 0 1.5rem", fontSize: "1.5rem", color: "#1e293b" }}>
        Dashboard
      </h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div
          style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            minWidth: "180px",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "0.25rem" }}>
            Total Products
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a" }}>
            {stats.products}
          </div>
        </div>
      </div>
      <p style={{ marginTop: "2rem", color: "#64748b", fontSize: "0.9rem" }}>
        Use the sidebar to manage products. More sections (orders, users) can be added later.
      </p>
    </div>
  );
}
