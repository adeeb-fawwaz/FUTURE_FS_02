import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const fetchLeads = async () => {
    const { data } = await API.get('/leads');
    setLeads(data);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this lead?')) {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    }
  };

  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Lead Dashboard</h2>

      {/* Stats */}
      <div style={styles.statsRow}>
        {['All', 'New', 'Contacted', 'Converted'].map(s => (
          <div key={s} style={{ ...styles.statCard, background: filter === s ? '#4f46e5' : '#fff', color: filter === s ? '#fff' : '#333' }}
            onClick={() => setFilter(s)}>
            <strong>{s === 'All' ? leads.length : leads.filter(l => l.status === s).length}</strong>
            <p>{s}</p>
          </div>
        ))}
      </div>

      {/* Lead Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th>Name</th><th>Email</th><th>Phone</th><th>Source</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(lead => (
            <tr key={lead._id} style={styles.row}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone || '—'}</td>
              <td>{lead.source}</td>
              <td><StatusBadge status={lead.status} /></td>
              <td>
                <button onClick={() => navigate(`/edit/${lead._id}`)} style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDelete(lead._id)} style={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding: '32px', maxWidth: '1200px', margin: '0 auto' },
  heading: { marginBottom: '24px', color: '#1a1a2e' },
  statsRow: { display: 'flex', gap: '16px', marginBottom: '32px' },
  statCard: { flex: 1, textAlign: 'center', padding: '20px', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  thead: { background: '#1a1a2e', color: '#fff' },
  row: { borderBottom: '1px solid #f0f0f0', textAlign: 'center', padding: '12px' },
  editBtn: { background: '#4f46e5', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', marginRight: '8px', cursor: 'pointer' },
  deleteBtn: { background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }
};