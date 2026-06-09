import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

export default function AddLead() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', source: 'Website', status: 'New', notes: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert('Name and Email are required!');
    await API.post('/leads', form);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>➕ Add New Lead</h2>
        {['name', 'email', 'phone'].map(field => (
          <input key={field} style={styles.input} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
        ))}
        <select style={styles.input} value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}>
          {['Website', 'Referral', 'Social Media', 'Email', 'Other'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select style={styles.input} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          {['New', 'Contacted', 'Converted'].map(s => <option key={s}>{s}</option>)}
        </select>
        <textarea style={{ ...styles.input, height: '100px' }} placeholder="Notes..."
          value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button style={styles.button} onClick={handleSubmit}>Save Lead</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '40px' },
  card: { background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '480px' },
  input: { width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }
};