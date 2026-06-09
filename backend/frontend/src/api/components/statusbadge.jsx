export default function StatusBadge({ status }) {
  const colors = {
    New: { bg: '#dbeafe', color: '#1d4ed8' },
    Contacted: { bg: '#fef9c3', color: '#854d0e' },
    Converted: { bg: '#dcfce7', color: '#15803d' }
  };
  const style = colors[status] || colors['New'];
  return (
    <span style={{ ...style, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
      {status}
    </span>
  );
}