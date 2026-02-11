import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_PRODUCTS } from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const { authHeader } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    productId: "",
    productName: "",
    productCategory: "",
    productPrice: "",
    imageOne: "",
    imageTwo: "",
    imageThree: "",
  });

  const loadProducts = () => {
    setLoading(true);
    axios
      .get(API_PRODUCTS, { headers: authHeader() })
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch((err) => setError(err.response?.data?.message || "Failed to load products"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAdd = () => {
    setFormMode("add");
    setEditingId(null);
    setForm({
      productId: "",
      productName: "",
      productCategory: "",
      productPrice: "",
      imageOne: "",
      imageTwo: "",
      imageThree: "",
    });
  };

  const openEdit = (p) => {
    setFormMode("edit");
    setEditingId(p._id);
    setForm({
      productId: p.productId || "",
      productName: p.productName || "",
      productCategory: p.productCategory || "",
      productPrice: p.productPrice || "",
      imageOne: p.imageOne || "",
      imageTwo: p.imageTwo || "",
      imageThree: p.imageThree || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const headers = authHeader();
    try {
      if (formMode === "edit" && editingId) {
        await axios.put(`${API_PRODUCTS}/${editingId}`, form, { headers });
      } else {
        await axios.post(API_PRODUCTS, form, { headers });
      }
      setFormMode(null);
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Request failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setError("");
    try {
      await axios.delete(`${API_PRODUCTS}/${id}`, { headers: authHeader() });
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#1e293b" }}>Products</h1>
        <button
          type="button"
          onClick={openAdd}
          style={{
            padding: "0.5rem 1rem",
            background: "#0f172a",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.875rem",
          }}
        >
          Add Product
        </button>
      </div>

      {error && (
        <div style={{ padding: "0.75rem", marginBottom: "1rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "6px" }}>
          {error}
        </div>
      )}

      {(formMode === "add" || formMode === "edit") && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            marginBottom: "1.5rem",
          }}
        >
          <h3 style={{ margin: "0 0 1rem" }}>{formMode === "edit" ? "Edit Product" : "New Product"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", maxWidth: "600px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Product ID</label>
              <input
                value={form.productId}
                onChange={(e) => setForm((f) => ({ ...f, productId: e.target.value }))}
                required
                style={{ width: "100%", padding: "0.5rem", border: "1px solid #e2e8f0", borderRadius: "6px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Name</label>
              <input
                value={form.productName}
                onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))}
                style={{ width: "100%", padding: "0.5rem", border: "1px solid #e2e8f0", borderRadius: "6px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Category</label>
              <input
                value={form.productCategory}
                onChange={(e) => setForm((f) => ({ ...f, productCategory: e.target.value }))}
                style={{ width: "100%", padding: "0.5rem", border: "1px solid #e2e8f0", borderRadius: "6px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Price</label>
              <input
                value={form.productPrice}
                onChange={(e) => setForm((f) => ({ ...f, productPrice: e.target.value }))}
                style={{ width: "100%", padding: "0.5rem", border: "1px solid #e2e8f0", borderRadius: "6px" }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Image URL (main)</label>
              <input
                value={form.imageOne}
                onChange={(e) => setForm((f) => ({ ...f, imageOne: e.target.value }))}
                placeholder="https://..."
                style={{ width: "100%", padding: "0.5rem", border: "1px solid #e2e8f0", borderRadius: "6px" }}
              />
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <button type="submit" style={{ padding: "0.5rem 1rem", background: "#0f172a", color: "#fff", border: "none", borderRadius: "6px" }}>
              {editing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => { setFormMode(null); setEditingId(null); }}
              style={{ padding: "0.5rem 1rem", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "6px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>Loading products…</div>
        ) : products.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>No products yet. Add one above.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name / Category</th>
                <th>Price</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.productId || p._id}</td>
                  <td>
                    <div>{p.productName || p.productCategory || "—"}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{p.productCategory}</div>
                  </td>
                  <td>{p.productPrice != null ? `$${p.productPrice}` : "—"}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      style={{ marginRight: "0.5rem", padding: "0.25rem 0.5rem", fontSize: "0.8rem" }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p._id)}
                      style={{ padding: "0.25rem 0.5rem", fontSize: "0.8rem", color: "#b91c1c" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
