import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PRODUCTS } from "../config/api";
import { useAuth } from "../context/AuthContext";

const sectionStyle = {
  marginBottom: "1.5rem",
  padding: "1rem",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};

const labelStyle = { fontSize: "0.75rem", color: "#64748b", marginBottom: "0.25rem" };
const valueStyle = { fontSize: "0.95rem", color: "#1e293b" };

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authHeader } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_PRODUCTS}/${id}`, { headers: authHeader() })
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: "2rem", color: "#64748b" }}>Loading…</div>;
  if (error) return <div style={{ padding: "1rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "8px" }}>{error}</div>;
  if (!product) return null;

  const fields = [
    { key: "productId", label: "Product ID" },
    { key: "productName", label: "Product Name" },
    { key: "productCategory", label: "Category" },
    { key: "productPrice", label: "Price" },
    { key: "productOnSale", label: "On Sale" },
    { key: "allProducts", label: "All Products" },
    { key: "productAbout", label: "About" },
    { key: "productLittleDetail", label: "Little Detail" },
    { key: "productInfo", label: "Product Info" },
    { key: "productColorOne", label: "Color 1" },
    { key: "productColortwo", label: "Color 2" },
    { key: "isProductBestseller", label: "Bestseller" },
    { key: "isProductNew", label: "New" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          type="button"
          onClick={() => navigate("/products")}
          style={{
            padding: "0.4rem 0.75rem",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          ← Back to list
        </button>
        <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#1e293b" }}>
          {product.productName || product.productCategory || product.productId || "Product details"}
        </h1>
      </div>

      <div style={sectionStyle}>
        <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem", color: "#475569" }}>Images</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[product.imageOne, product.imageTwo, product.imageThree].filter(Boolean).map((src, i) => (
            <div key={i}>
              <img src={src} alt="" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e2e8f0" }} />
              <div style={labelStyle}>Image {i + 1}</div>
            </div>
          ))}
          {![product.imageOne, product.imageTwo, product.imageThree].some(Boolean) && <span style={{ color: "#94a3b8" }}>No images</span>}
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem", color: "#475569" }}>Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {fields.map(({ key, label }) => (
            <div key={key}>
              <div style={labelStyle}>{label}</div>
              <div style={valueStyle}>{product[key] != null && product[key] !== "" ? String(product[key]) : "—"}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>MongoDB _id</div>
        <div style={{ ...valueStyle, fontFamily: "monospace", fontSize: "0.85rem" }}>{product._id}</div>
      </div>
    </div>
  );
}
