import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_INQUIRIES } from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function Inquiries() {
  const navigate = useNavigate();
  const { authHeader } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleReviewed = async (e, id, currentReviewed) => {
    e.stopPropagation();
    try {
      const idStr = String(id);
      const res = await axios.patch(
        `${API_INQUIRIES}/${idStr}`,
        { reviewed: !currentReviewed },
        { headers: authHeader() }
      );
      setError("");
      setInquiries((prev) =>
        prev.map((inq) => (String(inq._id) === idStr ? { ...inq, reviewed: res.data.reviewed } : inq))
      );
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to update";
      setError(msg);
    }
  };

  useEffect(() => {
    axios
      .get(API_INQUIRIES, { headers: authHeader() })
      .then((res) => {
        const raw = res.data;
        const list = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.inquiries)
            ? raw.inquiries
            : Array.isArray(raw?.data)
              ? raw.data
              : [];
        setInquiries(list);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load inquiries"))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    const date = d.toLocaleDateString(undefined, { dateStyle: "medium" });
    const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    return `${date}, ${time}`;
  };

  return (
    <div>
      <h1 style={{ margin: "0 0 1.5rem", fontSize: "1.5rem", color: "#1e293b" }}>
        Inquiries
      </h1>
      {error && (
        <div
          style={{
            padding: "0.75rem",
            marginBottom: "1rem",
            background: "#fef2f2",
            color: "#b91c1c",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          overflow: "hidden",
          border: "1px solid #f1f5f9",
        }}
      >
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
            Loading inquiries…
          </div>
        ) : inquiries.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
            No inquiries yet. Contact form submissions will appear here.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                    Date
                  </th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                    Name
                  </th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                    Email
                  </th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                    Phone
                  </th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase" }}>
                    Message
                  </th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", width: "140px" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, index) => (
                  <tr
                    key={String(inq._id ?? inq.id ?? index)}
                    onClick={() => navigate(`/inquiries/${inq._id ?? inq.id}`)}
                    style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                  >
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#64748b" }}>
                      {formatDate(inq.createdAt ?? inq.created_at)}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#1e293b" }}>
                      {[inq.firstname, inq.lastname].filter(Boolean).join(" ") || "—"}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem" }}>
                      <a href={`mailto:${inq.email || ""}`} style={{ color: "#0f172a" }}>
                        {inq.email ?? "—"}
                      </a>
                    </td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#475569" }}>
                      {inq.phone || "—"}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#475569", maxWidth: "320px" }}>
                      {inq.textmessage ?? inq.message ?? "—"}
                    </td>
                    <td style={{ padding: "0.75rem 1rem" }} onClick={(e) => e.stopPropagation()}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          marginRight: "0.5rem",
                          background: inq.reviewed ? "#dcfce7" : "#fef3c7",
                          color: inq.reviewed ? "#166534" : "#92400e",
                        }}
                      >
                        {inq.reviewed ? "Reviewed" : "Pending"}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleReviewed(e, inq._id ?? inq.id, !!inq.reviewed)}
                        style={{
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.75rem",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          background: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        {inq.reviewed ? "Mark pending" : "Mark reviewed"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
