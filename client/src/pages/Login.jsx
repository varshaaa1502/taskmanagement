import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      onLogin(data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-logo">✓</div>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to manage your tasks.</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submit}>
          <label>Email<input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required /></label>
          <label>Password<input type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required /></label>
          <button className="btn btn-primary full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <p className="switch">Don't have an account? <Link to="/register">Create one</Link></p>
      </section>
    </main>
  );
}
