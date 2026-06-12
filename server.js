import { useState, useEffect } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const STORAGE_KEY = "crm_leads_v1";

const SOURCES  = ["Website", "LinkedIn", "Referral", "Cold Call", "Walk-in", "Other"];
const STATUSES = ["New", "Contacted", "Converted"];

const STATUS_META = {
  New:       { color: "#3b82f6", bg: "#eff6ff", label: "New"       },
  Contacted: { color: "#f59e0b", bg: "#fffbeb", label: "Contacted" },
  Converted: { color: "#10b981", bg: "#ecfdf5", label: "Converted" },
};

const EMPTY_FORM = { name: "", email: "", phone: "", source: "Website", status: "New", notes: "" };

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#f8f5f0;color:#1c1410;}

/* ── NAVBAR ── */
.crm-nav{
  position:sticky;top:0;z-index:200;
  background:#ffffffee;backdrop-filter:blur(14px);
  border-bottom:1px solid #e8e0d6;
  height:60px;padding:0 5%;
  display:flex;align-items:center;justify-content:space-between;
}
.crm-nav-brand{display:flex;align-items:center;gap:10px;}
.crm-nav-logo{
  font-family:'DM Serif Display',serif;
  font-size:1.25rem;color:#b87333;letter-spacing:-0.5px;
}
.crm-nav-sub{font-size:0.8rem;color:#9a8878;font-weight:500;}
.crm-nav-badge{
  font-size:0.75rem;font-weight:600;
  background:#b8733318;color:#b87333;
  border:1px solid #b8733330;
  padding:4px 12px;border-radius:20px;
}

/* ── MAIN ── */
.crm-main{max-width:1140px;margin:0 auto;padding:36px 5% 60px;}

/* ── STATS ── */
.crm-stats{
  display:grid;grid-template-columns:repeat(4,1fr);gap:14px;
  margin-bottom:32px;
}
.crm-stat{
  background:#fff;border:1px solid #e8e0d6;border-radius:12px;
  padding:20px 22px;
}
.crm-stat-num{
  font-family:'DM Serif Display',serif;
  font-size:2rem;line-height:1;margin-bottom:4px;
}
.crm-stat-lbl{font-size:0.78rem;color:#9a8878;text-transform:uppercase;letter-spacing:.5px;}

/* ── TOOLBAR ── */
.crm-toolbar{
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:12px;margin-bottom:20px;
}
.crm-toolbar-left{display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
.crm-title{
  font-family:'DM Serif Display',serif;
  font-size:1.4rem;color:#1c1410;
}
.crm-filter-select{
  background:#fff;border:1px solid #e8e0d6;border-radius:8px;
  padding:7px 14px;font-size:0.85rem;color:#1c1410;
  font-family:'DM Sans',sans-serif;outline:none;cursor:pointer;
}
.crm-filter-select:focus{border-color:#b87333;}

.crm-search{
  background:#fff;border:1px solid #e8e0d6;border-radius:8px;
  padding:7px 14px;font-size:0.85rem;color:#1c1410;
  font-family:'DM Sans',sans-serif;outline:none;width:220px;
}
.crm-search:focus{border-color:#b87333;}

/* ── BUTTONS ── */
.btn{
  border:none;border-radius:8px;font-family:'DM Sans',sans-serif;
  font-weight:600;cursor:pointer;transition:all .18s;display:inline-flex;
  align-items:center;gap:6px;
}
.btn:active{transform:scale(.97);}
.btn-add{
  background:#b87333;color:#fff;
  padding:9px 20px;font-size:0.88rem;
}
.btn-add:hover{background:#a3632a;}
.btn-cancel{
  background:#f3ede6;color:#9a8878;
  padding:9px 20px;font-size:0.88rem;
}
.btn-cancel:hover{background:#e8dfd4;}
.btn-save{
  background:#10b981;color:#fff;
  padding:6px 14px;font-size:0.8rem;border-radius:6px;
}
.btn-save:hover{background:#0da271;}
.btn-del{
  background:#fee2e2;color:#ef4444;
  padding:6px 12px;font-size:0.8rem;border-radius:6px;
  border:none;cursor:pointer;font-weight:600;transition:all .18s;
}
.btn-del:hover{background:#ef4444;color:#fff;}
.btn-edit{
  background:#f0f7ff;color:#3b82f6;
  padding:6px 12px;font-size:0.8rem;border-radius:6px;
  border:none;cursor:pointer;font-weight:600;transition:all .18s;
}
.btn-edit:hover{background:#3b82f6;color:#fff;}

/* ── FORM PANEL ── */
.crm-form-panel{
  background:#fff;border:1px solid #e8e0d6;border-radius:14px;
  padding:28px;margin-bottom:24px;
  animation:slideDown .25s ease both;
}
@keyframes slideDown{
  from{opacity:0;transform:translateY(-10px);}
  to{opacity:1;transform:translateY(0);}
}
.crm-form-title{
  font-size:1rem;font-weight:600;color:#1c1410;margin-bottom:20px;
}
.crm-form-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:14px;
}
.crm-fg{display:flex;flex-direction:column;gap:5px;}
.crm-fg.full{grid-column:1/-1;}
.crm-fg label{
  font-size:0.72rem;font-weight:600;color:#9a8878;
  text-transform:uppercase;letter-spacing:.5px;
}
.crm-fg input,.crm-fg select,.crm-fg textarea{
  background:#f8f5f0;border:1px solid #e8e0d6;border-radius:8px;
  padding:9px 13px;font-size:0.88rem;color:#1c1410;
  font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;
}
.crm-fg input:focus,.crm-fg select:focus,.crm-fg textarea:focus{
  border-color:#b87333;background:#fff;
}
.crm-fg textarea{min-height:72px;resize:vertical;}
.crm-form-actions{
  grid-column:1/-1;display:flex;gap:10px;justify-content:flex-end;
  margin-top:4px;
}

/* ── TABLE ── */
.crm-table-wrap{
  background:#fff;border:1px solid #e8e0d6;border-radius:14px;
  overflow:hidden;
}
.crm-table{width:100%;border-collapse:collapse;}
.crm-table thead tr{background:#f5f0ea;}
.crm-table th{
  padding:11px 16px;text-align:left;
  font-size:0.72rem;font-weight:600;
  text-transform:uppercase;letter-spacing:.5px;color:#9a8878;
  white-space:nowrap;
}
.crm-table td{
  padding:13px 16px;border-top:1px solid #f0ebe3;
  font-size:0.86rem;vertical-align:middle;
}
.crm-table tbody tr{transition:background .15s;}
.crm-table tbody tr:hover td{background:#fdf9f5;}

/* Status badge */
.status-badge{
  display:inline-flex;align-items:center;
  padding:3px 11px;border-radius:20px;
  font-size:0.75rem;font-weight:600;white-space:nowrap;
}

/* Status dropdown */
.status-select{
  border:1.5px solid;border-radius:20px;
  padding:4px 10px;font-size:0.78rem;font-weight:600;
  background:transparent;cursor:pointer;
  font-family:'DM Sans',sans-serif;outline:none;
  transition:opacity .2s;
}
.status-select:hover{opacity:.8;}

/* Source tag */
.source-tag{
  background:#f5f0ea;color:#9a8878;
  padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:500;
}

/* Notes cell */
.note-view{
  color:#b87333;cursor:pointer;font-size:0.82rem;
  border-bottom:1px dashed #b87333;max-width:160px;
  display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.note-view:empty::before{content:'+ Add note';color:#c8a888;}
.note-edit-wrap{display:flex;gap:6px;align-items:center;}
.note-edit-wrap input{
  border:1px solid #e8e0d6;border-radius:6px;
  padding:4px 8px;font-size:0.82rem;width:130px;
  font-family:'DM Sans',sans-serif;outline:none;
}
.note-edit-wrap input:focus{border-color:#b87333;}

/* Action col */
.crm-actions{display:flex;gap:6px;flex-wrap:nowrap;}

/* Empty + loading */
.crm-empty{
  text-align:center;padding:64px 20px;color:#9a8878;font-size:.95rem;
}
.crm-empty-icon{font-size:3rem;margin-bottom:12px;}

/* Toast */
.crm-toast{
  position:fixed;bottom:28px;right:28px;z-index:999;
  background:#1c1410;color:#f5ede3;
  padding:12px 22px;border-radius:10px;
  font-size:.86rem;font-weight:500;
  opacity:0;transform:translateY(12px);pointer-events:none;
  transition:all .35s;
}
.crm-toast.show{opacity:1;transform:translateY(0);}

/* Modal */
.crm-modal-bg{
  position:fixed;inset:0;background:rgba(0,0,0,.45);
  z-index:300;display:flex;align-items:center;justify-content:center;
  animation:fadeIn .2s ease;
}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.crm-modal{
  background:#fff;border-radius:16px;padding:32px;
  width:min(520px,94vw);max-height:90vh;overflow-y:auto;
  animation:slideDown .25s ease;
}
.crm-modal-title{
  font-family:'DM Serif Display',serif;font-size:1.2rem;
  color:#1c1410;margin-bottom:20px;
}
.crm-modal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:20px;}

/* Responsive */
@media(max-width:900px){
  .crm-stats{grid-template-columns:1fr 1fr;}
  .crm-table{display:block;overflow-x:auto;}
}
@media(max-width:600px){
  .crm-stats{grid-template-columns:1fr 1fr;}
  .crm-form-grid{grid-template-columns:1fr;}
  .crm-fg.full{grid-column:1;}
  .crm-toolbar{flex-direction:column;align-items:flex-start;}
  .crm-search{width:100%;}
}
`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function App() {
  // ── State ──
  const [leads, setLeads]           = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  });
  const [showForm, setShowForm]     = useState(false);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [editingId, setEditingId]   = useState(null);   // edit lead in modal
  const [editModal, setEditModal]   = useState(false);
  const [noteEdit, setNoteEdit]     = useState({ id: null, text: "" });
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch]         = useState("");
  const [toast, setToast]           = useState("");

  // ── Persist ──
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  // ── Toast helper ──
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  // ── CRUD ──
  const saveLead = () => {
    if (!form.name.trim())  return alert("Name is required.");
    if (!form.email.trim()) return alert("Email is required.");
    if (!/\S+@\S+\.\S+/.test(form.email)) return alert("Enter a valid email.");

    if (editingId) {
      setLeads(prev => prev.map(l => l.id === editingId ? { ...l, ...form } : l));
      showToast("✅ Lead updated!");
      setEditModal(false); setEditingId(null);
    } else {
      setLeads(prev => [{ id: uid(), createdAt: new Date().toLocaleDateString("en-IN"), ...form }, ...prev]);
      showToast("✅ Lead added!");
      setShowForm(false);
    }
    setForm(EMPTY_FORM);
  };

  const deleteLead = (id) => {
    if (!window.confirm("Delete this lead?")) return;
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast("🗑 Lead deleted.");
  };

  const updateStatus = (id, status) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    showToast(`🔄 Status → ${status}`);
  };

  const saveNote = (id) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: noteEdit.text } : l));
    setNoteEdit({ id: null, text: "" });
    showToast("📝 Note saved!");
  };

  const openEdit = (lead) => {
    setForm({ name: lead.name, email: lead.email, phone: lead.phone,
              source: lead.source, status: lead.status, notes: lead.notes });
    setEditingId(lead.id); setEditModal(true);
  };

  const cancelForm = () => {
    setShowForm(false); setForm(EMPTY_FORM);
  };

  // ── Filtered list ──
  const visible = leads.filter(l => {
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q || l.name.toLowerCase().includes(q)
      || l.email.toLowerCase().includes(q)
      || l.source.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  // ── Stats ──
  const stats = {
    total:     leads.length,
    new:       leads.filter(l => l.status === "New").length,
    contacted: leads.filter(l => l.status === "Contacted").length,
    converted: leads.filter(l => l.status === "Converted").length,
  };

  // ── Form field helper ──
  const setField = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  // ── Form JSX (reused for add + modal edit) ──
  const FormFields = () => (
    <div className="crm-form-grid">
      <div className="crm-fg">
        <label>Full Name *</label>
        <input name="name" value={form.name} onChange={setField} placeholder="e.g. Ravi Kumar" />
      </div>
      <div className="crm-fg">
        <label>Email *</label>
        <input name="email" type="email" value={form.email} onChange={setField} placeholder="ravi@email.com" />
      </div>
      <div className="crm-fg">
        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={setField} placeholder="+91 98765 43210" />
      </div>
      <div className="crm-fg">
        <label>Source</label>
        <select name="source" value={form.source} onChange={setField}>
          {SOURCES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="crm-fg">
        <label>Status</label>
        <select name="status" value={form.status} onChange={setField}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="crm-fg full">
        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={setField} placeholder="Any details about this lead..." />
      </div>
    </div>
  );

  return (
    <>
      <style>{css}</style>

      {/* ── NAVBAR ── */}
      <nav className="crm-nav">
        <div className="crm-nav-brand">
          <span className="crm-nav-logo">CRM.</span>
          <span className="crm-nav-sub">Lead Management System</span>
        </div>
        <span className="crm-nav-badge">Future Interns · Task 2</span>
      </nav>

      <main className="crm-main">

        {/* ── STATS ── */}
        <div className="crm-stats">
          {[
            { label: "Total Leads",  value: stats.total,     color: "#b87333" },
            { label: "New",          value: stats.new,       color: "#3b82f6" },
            { label: "Contacted",    value: stats.contacted, color: "#f59e0b" },
            { label: "Converted",    value: stats.converted, color: "#10b981" },
          ].map(s => (
            <div className="crm-stat" key={s.label}>
              <div className="crm-stat-num" style={{ color: s.color }}>{s.value}</div>
              <div className="crm-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── TOOLBAR ── */}
        <div className="crm-toolbar">
          <div className="crm-toolbar-left">
            <span className="crm-title">All Leads</span>
            <select className="crm-filter-select" value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}>
              <option>All</option>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <input className="crm-search" placeholder="🔍 Search name, email, source…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-add" onClick={() => { setShowForm(p => !p); setForm(EMPTY_FORM); }}>
            {showForm ? "✕ Cancel" : "+ Add Lead"}
          </button>
        </div>

        {/* ── ADD FORM ── */}
        {showForm && (
          <div className="crm-form-panel">
            <p className="crm-form-title">➕ New Lead</p>
            <FormFields />
            <div className="crm-form-actions" style={{ marginTop: 16 }}>
              <button className="btn btn-cancel" onClick={cancelForm}>Cancel</button>
              <button className="btn btn-add" onClick={saveLead}>Save Lead</button>
            </div>
          </div>
        )}

        {/* ── TABLE ── */}
        <div className="crm-table-wrap">
          {visible.length === 0 ? (
            <div className="crm-empty">
              <div className="crm-empty-icon">📋</div>
              {leads.length === 0
                ? "No leads yet. Click \"+ Add Lead\" to get started!"
                : "No leads match your filter."}
            </div>
          ) : (
            <table className="crm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((lead, i) => {
                  const sm = STATUS_META[lead.status];
                  return (
                    <tr key={lead.id}>
                      <td style={{ color: "#9a8878", fontWeight: 600 }}>{i + 1}</td>
                      <td><strong>{lead.name}</strong></td>
                      <td style={{ color: "#3b82f6" }}>{lead.email}</td>
                      <td>{lead.phone || "—"}</td>
                      <td><span className="source-tag">{lead.source}</span></td>

                      {/* ── Status dropdown ── */}
                      <td>
                        <select
                          className="status-select"
                          value={lead.status}
                          style={{ color: sm.color, borderColor: sm.color, background: sm.bg }}
                          onChange={e => updateStatus(lead.id, e.target.value)}
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>

                      {/* ── Notes inline edit ── */}
                      <td>
                        {noteEdit.id === lead.id ? (
                          <div className="note-edit-wrap">
                            <input
                              value={noteEdit.text}
                              onChange={e => setNoteEdit(p => ({ ...p, text: e.target.value }))}
                              onKeyDown={e => e.key === "Enter" && saveNote(lead.id)}
                              autoFocus
                            />
                            <button className="btn btn-save" onClick={() => saveNote(lead.id)}>Save</button>
                            <button className="btn btn-cancel" style={{ padding: "5px 10px", fontSize: "0.78rem" }}
                              onClick={() => setNoteEdit({ id: null, text: "" })}>✕</button>
                          </div>
                        ) : (
                          <span
                            className="note-view"
                            title={lead.notes || "Click to add note"}
                            onClick={() => setNoteEdit({ id: lead.id, text: lead.notes || "" })}
                          >{lead.notes}</span>
                        )}
                      </td>

                      <td style={{ color: "#9a8878", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                        {lead.createdAt}
                      </td>

                      {/* ── Actions ── */}
                      <td>
                        <div className="crm-actions">
                          <button className="btn-edit" onClick={() => openEdit(lead)}>✏️ Edit</button>
                          <button className="btn-del"  onClick={() => deleteLead(lead.id)}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* ── EDIT MODAL ── */}
      {editModal && (
        <div className="crm-modal-bg" onClick={e => e.target === e.currentTarget && setEditModal(false)}>
          <div className="crm-modal">
            <p className="crm-modal-title">✏️ Edit Lead</p>
            <FormFields />
            <div className="crm-modal-actions">
              <button className="btn btn-cancel"
                onClick={() => { setEditModal(false); setEditingId(null); setForm(EMPTY_FORM); }}>
                Cancel
              </button>
              <button className="btn btn-add" onClick={saveLead}>Update Lead</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <div className={`crm-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
