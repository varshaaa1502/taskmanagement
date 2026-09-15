import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      onLogin(data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-logo">✓</div>
        <h1>Create account</h1>
        <p className="muted">Start organizing your work today.</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submit}>
          <label>Full name<input value={form.name} onChange={e => setForm({...form, name:e.target.value})} required /></label>
          <label>Email<input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required /></label>
          <label>Password<input type="password" minLength="6" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required /></label>
          <button className="btn btn-primary full" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
        </form>
        <p className="switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </section>
    </main>
  );
}
