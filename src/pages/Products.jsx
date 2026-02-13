import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PRODUCTS } from "../config/api";
import { useAuth } from "../context/AuthContext";
import {
  productIdOptions,
  productCategoryOptions,
  productOnSaleOptions,
  allProductsOptions,
  productLittleDetailOptions,
  productColorOneOptions,
  productColortwoOptions,
  isProductBestsellerOptions,
  isProductNewOptions,
} from "../data/productOptions";

export default function Products() {
  const navigate = useNavigate();
  const { authHeader } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const emptyForm = {
    productId: "",
    productName: "",
    productCategory: "",
    productPrice: "",
    productOnSale: "false",
    allProducts: "true",
    productAbout: "",
    productLittleDetail: "",
    productInfo: "",
    productColorOne: "",
    productColortwo: "",
    isProductBestseller: "0",
    isProductNew: "no",
    imageOne: "",
    imageTwo: "",
    imageThree: "",
  };
  const [form, setForm] = useState(emptyForm);

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
    setForm(emptyForm);
  };

  const openEdit = (p) => {
    setFormMode("edit");
    setEditingId(p._id);
    setForm({
      productId: p.productId || "",
      productName: p.productName || "",
      productCategory: p.productCategory || "",
      productPrice: p.productPrice || "",
      productOnSale: p.productOnSale ?? "false",
      allProducts: p.allProducts ?? "true",
      productAbout: p.productAbout || "",
      productLittleDetail: p.productLittleDetail || "",
      productInfo: p.productInfo || "",
      productColorOne: p.productColorOne || "",
      productColortwo: p.productColortwo || "",
      isProductBestseller: p.isProductBestseller ?? "0",
      isProductNew: p.isProductNew ?? "no",
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

  const ensureOption = (options, current) =>
    current && !options.includes(current) ? [current, ...options] : options;

  const usedProductIds = new Set(products.map((p) => p.productId).filter(Boolean));
  const availableProductIds =
    formMode === "edit"
      ? productIdOptions.filter((id) => id === form.productId || !usedProductIds.has(id))
      : productIdOptions.filter((id) => !usedProductIds.has(id));
  const productIdSelectOptions = ensureOption(availableProductIds, form.productId);

  const fieldStyle = {
    width: "100%",
    padding: "0.625rem 0.75rem",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    color: "#1e293b",
    backgroundColor: "#fff",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  };
  const fieldFocus = { borderColor: "#0f172a", boxShadow: "0 0 0 3px rgba(15, 23, 42, 0.1)" };

  const renderInput = (name, label, placeholder, options = {}) => (
    <div key={name} style={{ marginBottom: "0.25rem" }}>
      <label style={{ display: "block", marginBottom: "0.375rem", fontSize: "0.8125rem", fontWeight: 500, color: "#475569" }}>
        {label}
      </label>
      <input
        type={options.type || "text"}
        value={form[name]}
        onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
        placeholder={placeholder}
        required={options.required || false}
        style={fieldStyle}
        onFocus={(e) => { e.target.style.borderColor = fieldFocus.borderColor; e.target.style.boxShadow = fieldFocus.boxShadow; }}
        onBlur={(e) => { e.target.style.borderColor = fieldStyle.border; e.target.style.boxShadow = "none"; }}
      />
    </div>
  );

  const renderSelect = (name, label, options, required = false) => (
    <div key={name} style={{ marginBottom: "0.25rem" }}>
      <label style={{ display: "block", marginBottom: "0.375rem", fontSize: "0.8125rem", fontWeight: 500, color: "#475569" }}>
        {label}
      </label>
      <select
        value={form[name]}
        onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
        required={required}
        style={fieldStyle}
      >
        <option value="">— Select —</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt || "(empty)"}</option>
        ))}
      </select>
    </div>
  );

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
            padding: "1.75rem",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
            marginBottom: "1.5rem",
            border: "1px solid #f1f5f9",
          }}
        >
          <h3 style={{ margin: "0 0 1.25rem", fontSize: "1.125rem", fontWeight: 600, color: "#1e293b" }}>
            {formMode === "edit" ? "Edit Product" : "New Product"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", maxWidth: "820px" }}>
            {renderSelect("productId", "Product ID", productIdSelectOptions, true)}
            {renderInput("productName", "Name", "e.g. Sofa, Lamp, Carpet")}
            {renderSelect("productCategory", "Category", ensureOption(productCategoryOptions, form.productCategory))}
            {renderInput("productPrice", "Price", "e.g. 85.00", { type: "text" })}
            {renderSelect("productOnSale", "On Sale", productOnSaleOptions)}
            {renderSelect("allProducts", "All Products", allProductsOptions)}
            {renderSelect("productColorOne", "Color 1", ensureOption(productColorOneOptions, form.productColorOne))}
            {renderSelect("productColortwo", "Color 2", ensureOption(productColortwoOptions, form.productColortwo))}
            {renderSelect("isProductBestseller", "Bestseller", isProductBestsellerOptions)}
            {renderSelect("isProductNew", "New", isProductNewOptions)}
            {renderInput("productAbout", "About", "Short description or product summary")}
            {renderSelect("productLittleDetail", "Little Detail", ensureOption(productLittleDetailOptions, form.productLittleDetail))}
            {renderInput("productInfo", "Info", "Product details or specifications")}
            {renderInput("imageOne", "Image URL 1", "https://...")}
            {renderInput("imageTwo", "Image URL 2", "https://...")}
            {renderInput("imageThree", "Image URL 3", "https://...")}
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
            <button
              type="submit"
              style={{
                padding: "0.625rem 1.25rem",
                background: "#0f172a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {formMode === "edit" ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => { setFormMode(null); setEditingId(null); }}
              style={{
                padding: "0.625rem 1.25rem",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "0.875rem",
                color: "#475569",
              }}
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
                <tr
                  key={p._id}
                  onClick={() => navigate(`/products/${p._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{p.productId || p._id}</td>
                  <td>
                    <div>{p.productName || p.productCategory || "—"}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{p.productCategory}</div>
                  </td>
                  <td>{p.productPrice != null ? `$${p.productPrice}` : "—"}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openEdit(p); }}
                        title="Edit"
                        style={{
                          padding: "0.35rem",
                          border: "none",
                          background: "#f1f5f9",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleDelete(p._id); }}
                        title="Delete"
                        style={{
                          padding: "0.35rem",
                          border: "none",
                          background: "#fef2f2",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#b91c1c",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
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
