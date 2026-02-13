import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_USERS } from "../config/api";
import { useAuth } from "../context/AuthContext";

const tableCell = { padding: "0.75rem 1rem", borderBottom: "1px solid #e2e8f0" };
const inputStyle = { width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #e2e8f0", borderRadius: "6px" };
const btn = (bg, color = "#1e293b") => ({
  padding: "0.35rem 0.65rem",
  border: "none",
  borderRadius: "6px",
  fontSize: "0.8rem",
  cursor: "pointer",
  background: bg,
  color: color === "white" ? "#fff" : color,
});

export default function Users() {
  const { authHeader, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", email: "", password: "", role: "user" });

  const loadUsers = () => {
    setLoading(true);
    axios
      .get(API_USERS, { headers: authHeader() })
      .then((res) => setUsers(Array.isArray(res.data) ? res.data : []))
      .catch((err) => setError(err.response?.data?.message || "Failed to load users"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(API_USERS, addForm, { headers: authHeader() });
      setShowAdd(false);
      setAddForm({ name: "", email: "", password: "", role: "user" });
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add user");
    }
  };

  const handleRoleChange = async (userId, role) => {
    setError("");
    try {
      await axios.patch(`${API_USERS}/${userId}`, { role }, { headers: authHeader() });
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update role");
    }
  };

  const handleToggleActive = async (u) => {
    setError("");
    const next = u.isActive === false;
    try {
      await axios.patch(`${API_USERS}/${u._id}`, { isActive: next }, { headers: authHeader() });
      loadUsers();
    } catch (err) {
      const msg = err.response?.data?.message || (err.response?.status === 401 ? "Session expired. Please sign in again." : "Failed to update status");
      setError(msg);
    }
  };

  const handleDelete = async (u) => {
    if (u._id === currentUser?.id) {
      setError("You cannot delete your own account");
      return;
    }
    if (!window.confirm(`Delete user "${u.name}" (${u.email})?`)) return;
    setError("");
    try {
      await axios.delete(`${API_USERS}/${u._id}`, { headers: authHeader() });
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#1e293b" }}>Users</h1>
        <button type="button" onClick={() => { setShowAdd(true); setError(""); }} style={{ ...btn("#0f172a", "white") }}>
          Add User
        </button>
      </div>

      {error && (
        <div style={{ padding: "0.75rem", marginBottom: "1rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "6px" }}>
          {error}
        </div>
      )}

      {showAdd && (
        <form
          onSubmit={handleAddUser}
          style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            marginBottom: "1.5rem",
            maxWidth: "400px",
          }}
        >
          <h3 style={{ margin: "0 0 1rem" }}>New User</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Name *</label>
              <input
                value={addForm.name}
                onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Email *</label>
              <input
                type="email"
                value={addForm.email}
                onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Password *</label>
              <input
                type="password"
                value={addForm.password}
                onChange={(e) => setAddForm((f) => ({ ...f, password: e.target.value }))}
                required
                minLength={6}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Role</label>
              <select
                value={addForm.role}
                onChange={(e) => setAddForm((f) => ({ ...f, role: e.target.value }))}
                style={inputStyle}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <button type="submit" style={btn("#0f172a", "white")}>Create User</button>
            <button type="button" onClick={() => setShowAdd(false)} style={btn("#f1f5f9")}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>Loading users…</div>
        ) : users.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>No users yet.</div>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={{ ...tableCell, textAlign: "left" }}>Name</th>
                <th style={{ ...tableCell, textAlign: "left" }}>Email</th>
                <th style={{ ...tableCell, textAlign: "left" }}>Role</th>
                <th style={{ ...tableCell, textAlign: "left" }}>Status</th>
                <th style={{ ...tableCell, textAlign: "left", width: "200px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={tableCell}>{u.name || "—"}</td>
                  <td style={tableCell}>{u.email || "—"}</td>
                  <td style={tableCell}>
                    <select
                      value={u.role || "user"}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      disabled={u._id === currentUser?.id}
                      style={{ ...inputStyle, width: "auto", padding: "0.3rem 0.5rem", fontSize: "0.85rem" }}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td style={tableCell}>
                    <span style={{ color: u.isActive !== false ? "#16a34a" : "#b91c1c", fontWeight: 500 }}>
                      {u.isActive !== false ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td style={tableCell}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => handleToggleActive(u)}
                        title={u.isActive !== false ? "Disable user" : "Enable user"}
                        style={u.isActive !== false ? btn("#fef3c7", "#b45309") : btn("#dcfce7", "#16a34a")}
                      >
                        {u.isActive !== false ? "Disable" : "Enable"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(u)}
                        disabled={u._id === currentUser?.id}
                        title={u._id === currentUser?.id ? "Cannot delete yourself" : "Delete user"}
                        style={{ ...btn("#fef2f2", "#b91c1c"), opacity: u._id === currentUser?.id ? 0.5 : 1 }}
                      >
                        Delete
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
