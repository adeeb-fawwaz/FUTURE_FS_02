import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axiosConfig';

export default function EditLead() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', email: '', phone: '', source: '', status: '', notes: '' });
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/leads').then(({ data }) => {
      const lead = data.find(l => l._id === id);
      if (lead) setForm(lead);
    });
  }, [id]);

  const handleUpdate = async () => {
    await API.put(`/leads/${id}`, form);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>✏️ Edit Lead</h2>
        {['name', 'email', 'phone'].map(field => (
          <input key={field} style={styles.input} placeholder={field}
            value={form[field] || ''} onChange={e => setForm({ ...form, [field]: e.target.value })} />
        ))}
        <select style={styles.input} value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}>
          {['Website', 'Referral', 'Social Media', 'Email', 'Other'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select style={styles.input} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          {['New', 'Contacted', 'Converted'].map(s => <option key={s}>{s}</option>)}
        </select>
        <textarea style={{ ...styles.input, height: '100px' }} placeholder="Notes..."
          value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button style={styles.button} onClick={handleUpdate}>Update Lead</button>
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