import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_INQUIRIES } from "../config/api";
import { useAuth } from "../context/AuthContext";

const sectionStyle = {
  marginBottom: "1.5rem",
  padding: "1.25rem",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  border: "1px solid #f1f5f9",
};
const labelStyle = { fontSize: "0.75rem", color: "#64748b", marginBottom: "0.25rem", display: "block" };
const valueStyle = { fontSize: "0.95rem", color: "#1e293b" };

export default function InquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authHeader } = useAuth();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_INQUIRIES}/${id}`, { headers: authHeader() })
      .then((res) => setInquiry(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load inquiry"))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleReviewed = async () => {
    if (!inquiry) return;
    try {
      const id = inquiry._id?.toString?.() ?? inquiry._id;
      const res = await axios.patch(
        `${API_INQUIRIES}/${id}`,
        { reviewed: !inquiry.reviewed },
        { headers: authHeader() }
      );
      setInquiry(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    const date = d.toLocaleDateString(undefined, { dateStyle: "medium" });
    const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    return `${date}, ${time}`;
  };

  if (loading) return <div style={{ padding: "2rem", color: "#64748b" }}>Loading…</div>;
  if (error) return <div style={{ padding: "1rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "8px" }}>{error}</div>;
  if (!inquiry) return null;

  const name = [inquiry.firstname, inquiry.lastname].filter(Boolean).join(" ") || "—";

  return (
    <div>
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => navigate("/inquiries")}
          style={{
            padding: "0.5rem 1rem",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          ← Back to Inquiries
        </button>
        <span
          style={{
            padding: "0.35rem 0.75rem",
            borderRadius: "8px",
            fontSize: "0.8125rem",
            fontWeight: 500,
            background: inquiry.reviewed ? "#dcfce7" : "#fef3c7",
            color: inquiry.reviewed ? "#166534" : "#92400e",
          }}
        >
          {inquiry.reviewed ? "Reviewed" : "Pending"}
        </span>
        <button
          type="button"
          onClick={toggleReviewed}
          style={{
            padding: "0.5rem 1rem",
            background: inquiry.reviewed ? "#fef3c7" : "#dcfce7",
            color: inquiry.reviewed ? "#92400e" : "#166534",
            border: "1px solid",
            borderColor: inquiry.reviewed ? "#fcd34d" : "#86efac",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {inquiry.reviewed ? "Mark as Pending" : "Mark as Reviewed"}
        </button>
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>Submitted</div>
        <div style={valueStyle}>{formatDate(inquiry.createdAt)}</div>
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>Name</div>
        <div style={valueStyle}>{name}</div>
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>Email</div>
        <div style={valueStyle}>
          <a href={`mailto:${inquiry.email}`} style={{ color: "#0f172a" }}>{inquiry.email}</a>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>Phone</div>
        <div style={valueStyle}>{inquiry.phone || "—"}</div>
      </div>

      <div style={sectionStyle}>
        <div style={labelStyle}>Message</div>
        <div style={{ ...valueStyle, whiteSpace: "pre-wrap" }}>{inquiry.textmessage ?? inquiry.message ?? "—"}</div>
      </div>
    </div>
  );
}
