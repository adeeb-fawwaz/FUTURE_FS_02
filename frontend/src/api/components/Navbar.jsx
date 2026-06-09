import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  if (!token) return null;

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>📊 Mini CRM</span>
      <div>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/add" style={styles.link}>+ Add Lead</Link>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: '#1a1a2e', color: '#fff' },
  brand: { fontSize: '20px', fontWeight: 'bold', color: '#fff' },
  link: { color: '#a5b4fc', marginRight: '20px', textDecoration: 'none', fontSize: '15px' },
  logout: { background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }
};