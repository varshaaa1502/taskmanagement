export default function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="brand"><span className="brand-mark">✓</span> TaskFlow</div>
      <div className="nav-user">
        <span>Hi, {user.name}</span>
        <button className="btn btn-ghost" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}
