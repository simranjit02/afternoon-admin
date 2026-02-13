export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";
export const API_AUTH = `${API_BASE}/auth`;
export const API_PRODUCTS = `${API_BASE}/products`;
export const API_USERS = `${API_BASE}/users`;
export const API_INQUIRIES = `${API_BASE}/inquiries`;
