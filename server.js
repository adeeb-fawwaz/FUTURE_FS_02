<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Future Interns – Client Lead Management</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f5f6fa;
    --surface: #ffffff;
    --border: #e2e6ef;
    --text: #1a1d2e;
    --muted: #6b7280;
    --accent: #4f46e5;
    --accent-light: #eef2ff;
    --accent-dark: #3730a3;
    --success: #059669;
    --success-light: #ecfdf5;
    --warning: #d97706;
    --warning-light: #fffbeb;
    --danger: #dc2626;
    --danger-light: #fef2f2;
    --info: #0284c7;
    --info-light: #e0f2fe;
    --radius: 10px;
    --shadow: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);
  }
  body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

  /* NAV */
  .nav {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    position: sticky; top: 0; z-index: 100;
    box-shadow: var(--shadow);
  }
  .nav-brand { font-size: 17px; font-weight: 600; color: var(--accent); display: flex; align-items: center; gap: 8px; }
  .nav-brand svg { width: 28px; height: 28px; }
  .nav-actions { display: flex; gap: 10px; }
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 7px; font-size: 13px; font-weight: 500; border: 1px solid transparent; cursor: pointer; transition: all .15s; white-space: nowrap; }
  .btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }
  .btn-primary:hover { background: var(--accent-dark); border-color: var(--accent-dark); }
  .btn-outline { background: var(--surface); color: var(--text); border-color: var(--border); }
  .btn-outline:hover { background: var(--bg); }
  .btn-danger { background: var(--danger); color: #fff; border-color: var(--danger); }
  .btn-danger:hover { background: #b91c1c; }
  .btn-sm { padding: 4px 10px; font-size: 12px; }
  .btn svg { width: 15px; height: 15px; }

  /* LAYOUT */
  .main { max-width: 1200px; margin: 0 auto; padding: 2rem; }

  /* STATS */
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; margin-bottom: 2rem; }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 1.25rem; box-shadow: var(--shadow); }
  .stat-label { font-size: 12px; color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .04em; }
  .stat-value { font-size: 26px; font-weight: 600; }
  .stat-card.total .stat-value { color: var(--accent); }
  .stat-card.new .stat-value { color: var(--info); }
  .stat-card.contacted .stat-value { color: var(--warning); }
  .stat-card.converted .stat-value { color: var(--success); }

  /* PANEL */
  .panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); margin-bottom: 1.5rem; overflow: hidden; }
  .panel-header { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .panel-title { font-size: 15px; font-weight: 600; }
  .panel-body { padding: 1.25rem; }

  /* FORM */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 10px; align-items: end; }
  @media(max-width:768px){ .form-grid { grid-template-columns: 1fr; } }
  .form-group { display: flex; flex-direction: column; gap: 5px; }
  .form-label { font-size: 12px; color: var(--muted); font-weight: 500; }
  .form-control { padding: 8px 10px; border: 1px solid var(--border); border-radius: 7px; font-size: 13px; font-family: inherit; color: var(--text); background: var(--surface); transition: border-color .15s, box-shadow .15s; }
  .form-control:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(79,70,229,.12); }
  .form-control.error { border-color: var(--danger); }

  /* TOOLBAR */
  .toolbar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  .search-wrap { position: relative; flex: 1; min-width: 180px; }
  .search-wrap svg { position: absolute; left: 9px; top: 50%; transform: translateY(-50%); color: var(--muted); width: 15px; height: 15px; }
  .search-input { width: 100%; padding: 7px 10px 7px 32px; border: 1px solid var(--border); border-radius: 7px; font-size: 13px; font-family: inherit; color: var(--text); background: var(--surface); }
  .search-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(79,70,229,.12); }
  .filter-select { padding: 7px 10px; border: 1px solid var(--border); border-radius: 7px; font-size: 13px; font-family: inherit; color: var(--text); background: var(--surface); cursor: pointer; }
  .filter-select:focus { outline: none; border-color: var(--accent); }

  /* TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  thead th { background: var(--bg); padding: 10px 14px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); border-bottom: 1px solid var(--border); white-space: nowrap; cursor: pointer; user-select: none; }
  thead th:hover { color: var(--text); }
  thead th .sort-icon { margin-left: 4px; opacity: .4; }
  tbody tr { transition: background .1s; }
  tbody tr:hover { background: #f8f9fb; }
  tbody td { padding: 12px 14px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  tbody tr:last-child td { border-bottom: none; }

  /* BADGES */
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 99px; font-size: 11px; font-weight: 500; white-space: nowrap; }
  .badge-new { background: var(--info-light); color: var(--info); }
  .badge-contacted { background: var(--warning-light); color: var(--warning); }
  .badge-converted { background: var(--success-light); color: var(--success); }
  .badge-lost { background: var(--danger-light); color: var(--danger); }
  .badge-website { background: var(--accent-light); color: var(--accent); }
  .badge-linkedin { background: #e0f0ff; color: #0a66c2; }
  .badge-cold { background: #f0fdf4; color: #16a34a; }
  .badge-referral { background: #fdf4ff; color: #9333ea; }
  .badge-other { background: var(--bg); color: var(--muted); }

  /* AVATAR */
  .avatar { width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12px; flex-shrink: 0; }

  /* ACTIONS */
  .actions { display: flex; gap: 5px; }

  /* EMPTY */
  .empty { text-align: center; padding: 3rem 1rem; color: var(--muted); }
  .empty svg { width: 40px; height: 40px; margin: 0 auto 12px; opacity: .3; display: block; }
  .empty p { font-size: 14px; }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; }
  .modal { background: var(--surface); border-radius: var(--radius); box-shadow: 0 20px 60px rgba(0,0,0,.2); width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
  .modal-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .modal-title { font-size: 16px; font-weight: 600; }
  .modal-body { padding: 1.5rem; }
  .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 10px; }
  .modal-close { background: none; border: none; cursor: pointer; color: var(--muted); padding: 4px; border-radius: 5px; display: flex; }
  .modal-close:hover { color: var(--text); background: var(--bg); }

  /* SETTINGS TABS */
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: 1.5rem; }
  .tab { padding: 8px 14px; font-size: 13px; font-weight: 500; border: none; background: none; cursor: pointer; color: var(--muted); border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color .15s; }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .tab:hover:not(.active) { color: var(--text); }
  .tab-panel { display: none; }
  .tab-panel.active { display: block; }

  /* HISTORY LOG */
  .log-entry { padding: 8px 0; border-bottom: 1px solid var(--border); display: flex; gap: 10px; font-size: 13px; }
  .log-entry:last-child { border-bottom: none; }
  .log-time { color: var(--muted); white-space: nowrap; font-size: 11px; flex-shrink: 0; margin-top: 2px; }
  .log-text { color: var(--text); }

  /* TOAST */
  .toast-container { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 300; display: flex; flex-direction: column; gap: 8px; }
  .toast { background: var(--text); color: #fff; padding: 10px 16px; border-radius: 8px; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,.2); display: flex; align-items: center; gap: 8px; animation: slideIn .2s; }
  .toast.success { background: var(--success); }
  .toast.error { background: var(--danger); }
  .toast.info { background: var(--accent); }
  @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  /* CONFIRM */
  .confirm-msg { font-size: 14px; color: var(--muted); margin-top: 8px; }

  /* SETTINGS FORM */
  .settings-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); gap: 1rem; }
  .settings-row:last-child { border-bottom: none; }
  .settings-info { flex: 1; }
  .settings-info strong { font-size: 13px; font-weight: 500; display: block; }
  .settings-info span { font-size: 12px; color: var(--muted); }
  .toggle { position: relative; width: 36px; height: 20px; flex-shrink: 0; }
  .toggle input { opacity: 0; width: 0; height: 0; }
  .toggle-slider { position: absolute; cursor: pointer; inset: 0; background: #ccc; border-radius: 20px; transition: .2s; }
  .toggle-slider:before { content: ''; position: absolute; width: 14px; height: 14px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: .2s; }
  input:checked + .toggle-slider { background: var(--accent); }
  input:checked + .toggle-slider:before { transform: translateX(16px); }

  .section-heading { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); margin-bottom: 10px; margin-top: 1.5rem; }
  .section-heading:first-child { margin-top: 0; }

  /* HISTORY PANEL */
  .history-area { max-height: 300px; overflow-y: auto; }
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <div class="nav-brand">
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill="#4f46e5"/>
      <path d="M7 20l5-8 4 5 3-4 4 7H7z" fill="white" opacity=".9"/>
      <circle cx="20" cy="9" r="3" fill="white" opacity=".7"/>
    </svg>
    Future Interns CRM
  </div>
  <div class="nav-actions">
    <button class="btn btn-outline" onclick="openSettings()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      Settings
    </button>
    <button class="btn btn-primary" onclick="openAddLead()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Add New Lead
    </button>
  </div>
</nav>

<!-- MAIN -->
<div class="main">

  <!-- STATS -->
  <div class="stats" id="stats-row">
    <!-- filled by JS -->
  </div>

  <!-- ADD LEAD INLINE PANEL -->
  <div class="panel" id="add-lead-panel" style="display:none;">
    <div class="panel-header">
      <span class="panel-title">Capture New Lead</span>
      <button class="btn btn-outline btn-sm" onclick="closeAddLead()">Close</button>
    </div>
    <div class="panel-body">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Client Name *</label>
          <input class="form-control" id="f-name" placeholder="e.g. Priya Sharma" />
        </div>
        <div class="form-group">
          <label class="form-label">Email Address *</label>
          <input class="form-control" id="f-email" type="email" placeholder="priya@company.com" />
        </div>
        <div class="form-group">
          <label class="form-label">Lead Source</label>
          <select class="form-control" id="f-source">
            <option value="Website Contact Form">Website Contact Form</option>
            <option value="LinkedIn Inbound">LinkedIn Inbound</option>
            <option value="Cold Email Outreach">Cold Email Outreach</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" style="height:38px;" onclick="addLead()">Add Lead</button>
        </div>
      </div>
    </div>
  </div>

  <!-- LEADS TABLE -->
  <div class="panel">
    <div class="panel-header">
      <span class="panel-title">Client Lead Pipeline</span>
      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" id="search-input" placeholder="Search leads…" oninput="renderTable()" />
        </div>
        <select class="filter-select" id="stage-filter" onchange="renderTable()">
          <option value="">All Stages</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
        <select class="filter-select" id="source-filter" onchange="renderTable()">
          <option value="">All Sources</option>
          <option value="Website Contact Form">Website</option>
          <option value="LinkedIn Inbound">LinkedIn</option>
          <option value="Cold Email Outreach">Cold Email</option>
          <option value="Referral">Referral</option>
          <option value="Other">Other</option>
        </select>
        <button class="btn btn-outline btn-sm" onclick="exportCSV()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
      </div>
    </div>
    <div class="table-wrap">
      <table id="leads-table">
        <thead>
          <tr>
            <th onclick="sortBy('date')">Date <span class="sort-icon">↕</span></th>
            <th onclick="sortBy('name')">Client <span class="sort-icon">↕</span></th>
            <th onclick="sortBy('email')">Email <span class="sort-icon">↕</span></th>
            <th onclick="sortBy('source')">Source <span class="sort-icon">↕</span></th>
            <th onclick="sortBy('stage')">Stage <span class="sort-icon">↕</span></th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="leads-body"></tbody>
      </table>
    </div>
  </div>

</div>

<!-- EDIT LEAD MODAL -->
<div class="modal-overlay" id="edit-modal" style="display:none;" onclick="closeEditIfOutside(event)">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title">Edit Lead</span>
      <button class="modal-close" onclick="closeEdit()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div class="modal-body">
      <input type="hidden" id="edit-id" />
      <div class="form-grid" style="grid-template-columns:1fr 1fr;">
        <div class="form-group">
          <label class="form-label">Client Name *</label>
          <input class="form-control" id="edit-name" />
        </div>
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input class="form-control" id="edit-email" type="email" />
        </div>
        <div class="form-group">
          <label class="form-label">Lead Source</label>
          <select class="form-control" id="edit-source">
            <option>Website Contact Form</option>
            <option>LinkedIn Inbound</option>
            <option>Cold Email Outreach</option>
            <option>Referral</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Pipeline Stage</label>
          <select class="form-control" id="edit-stage">
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
            <option>Lost</option>
          </select>
        </div>
      </div>
      <div class="form-group" style="margin-top:12px;">
        <label class="form-label">Notes</label>
        <textarea class="form-control" id="edit-notes" rows="3" style="resize:vertical;"></textarea>
      </div>
      <div style="margin-top:16px;">
        <p class="section-heading">Interaction History</p>
        <div class="history-area" id="edit-history"></div>
        <div style="display:flex;gap:8px;margin-top:10px;">
          <input class="form-control" id="new-log" placeholder="Add interaction note…" style="flex:1;" onkeydown="if(event.key==='Enter')addLog()" />
          <button class="btn btn-outline btn-sm" onclick="addLog()">Log</button>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeEdit()">Cancel</button>
      <button class="btn btn-primary" onclick="saveEdit()">Save Changes</button>
    </div>
  </div>
</div>

<!-- DELETE CONFIRM MODAL -->
<div class="modal-overlay" id="delete-modal" style="display:none;" onclick="closeDeleteIfOutside(event)">
  <div class="modal" style="max-width:380px;">
    <div class="modal-header">
      <span class="modal-title">Delete Lead</span>
      <button class="modal-close" onclick="closeDelete()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div class="modal-body">
      <p style="font-size:14px;">Are you sure you want to permanently delete <strong id="delete-name"></strong>?</p>
      <p class="confirm-msg">This action cannot be undone.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeDelete()">Cancel</button>
      <button class="btn btn-danger" onclick="confirmDelete()">Delete</button>
    </div>
  </div>
</div>

<!-- SETTINGS MODAL -->
<div class="modal-overlay" id="settings-modal" style="display:none;" onclick="closeSettingsIfOutside(event)">
  <div class="modal" style="max-width:560px;">
    <div class="modal-header">
      <span class="modal-title">Settings</span>
      <button class="modal-close" onclick="closeSettings()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div class="modal-body">
      <div class="tabs">
        <button class="tab active" onclick="switchTab('general')">General</button>
        <button class="tab" onclick="switchTab('pipeline')">Pipeline</button>
        <button class="tab" onclick="switchTab('notifications')">Notifications</button>
        <button class="tab" onclick="switchTab('data')">Data</button>
      </div>

      <!-- GENERAL -->
      <div class="tab-panel active" id="tab-general">
        <p class="section-heading">Workspace</p>
        <div class="form-group" style="margin-bottom:12px;">
          <label class="form-label">Workspace Name</label>
          <input class="form-control" id="s-workspace" value="Future Interns" />
        </div>
        <div class="form-group" style="margin-bottom:12px;">
          <label class="form-label">Admin Email</label>
          <input class="form-control" id="s-email" type="email" value="admin@futureinterns.io" />
        </div>
        <p class="section-heading">Display</p>
        <div class="settings-row">
          <div class="settings-info"><strong>Compact table rows</strong><span>Reduce padding in lead table</span></div>
          <label class="toggle"><input type="checkbox" id="s-compact" onchange="applyCompact(this)" /><span class="toggle-slider"></span></label>
        </div>
        <div class="settings-row">
          <div class="settings-info"><strong>Show avatar initials</strong><span>Display colored initials in table</span></div>
          <label class="toggle"><input type="checkbox" id="s-avatars" checked onchange="renderTable()" /><span class="toggle-slider"></span></label>
        </div>
      </div>

      <!-- PIPELINE -->
      <div class="tab-panel" id="tab-pipeline">
        <p class="section-heading">Stage Labels</p>
        <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">Rename pipeline stages to match your workflow.</p>
        <div class="form-grid" style="grid-template-columns:1fr 1fr;gap:10px;">
          <div class="form-group"><label class="form-label">Stage 1</label><input class="form-control" id="sl-1" value="New" /></div>
          <div class="form-group"><label class="form-label">Stage 2</label><input class="form-control" id="sl-2" value="Contacted" /></div>
          <div class="form-group"><label class="form-label">Stage 3</label><input class="form-control" id="sl-3" value="Converted" /></div>
          <div class="form-group"><label class="form-label">Stage 4</label><input class="form-control" id="sl-4" value="Lost" /></div>
        </div>
        <p class="section-heading" style="margin-top:1.5rem;">Default Lead Source</p>
        <div class="form-group">
          <select class="form-control" id="s-default-source">
            <option>Website Contact Form</option>
            <option>LinkedIn Inbound</option>
            <option>Cold Email Outreach</option>
            <option>Referral</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <!-- NOTIFICATIONS -->
      <div class="tab-panel" id="tab-notifications">
        <p style="font-size:13px;color:var(--muted);margin-bottom:12px;">Control which events trigger a notification.</p>
        <div class="settings-row">
          <div class="settings-info"><strong>New lead added</strong><span>Show toast when a lead is captured</span></div>
          <label class="toggle"><input type="checkbox" id="n-new" checked /><span class="toggle-slider"></span></label>
        </div>
        <div class="settings-row">
          <div class="settings-info"><strong>Stage changed</strong><span>Notify when a lead moves stages</span></div>
          <label class="toggle"><input type="checkbox" id="n-stage" checked /><span class="toggle-slider"></span></label>
        </div>
        <div class="settings-row">
          <div class="settings-info"><strong>Lead deleted</strong><span>Notify on deletion</span></div>
          <label class="toggle"><input type="checkbox" id="n-del" checked /><span class="toggle-slider"></span></label>
        </div>
        <div class="settings-row">
          <div class="settings-info"><strong>Export completed</strong><span>Notify after CSV export</span></div>
          <label class="toggle"><input type="checkbox" id="n-export" checked /><span class="toggle-slider"></span></label>
        </div>
      </div>

      <!-- DATA -->
      <div class="tab-panel" id="tab-data">
        <p class="section-heading">Import / Export</p>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:8px;">
            <div><strong style="font-size:13px;">Export all leads</strong><br><span style="font-size:12px;color:var(--muted);">Download as CSV file</span></div>
            <button class="btn btn-outline btn-sm" onclick="exportCSV();closeSettings();">Export CSV</button>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:8px;">
            <div><strong style="font-size:13px;">Clear all leads</strong><br><span style="font-size:12px;color:var(--muted);">Permanently delete all lead data</span></div>
            <button class="btn btn-danger btn-sm" onclick="clearAllLeads()">Clear All</button>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:8px;">
            <div><strong style="font-size:13px;">Load sample data</strong><br><span style="font-size:12px;color:var(--muted);">Populate with demo leads</span></div>
            <button class="btn btn-outline btn-sm" onclick="loadSampleData()">Load Samples</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeSettings()">Cancel</button>
      <button class="btn btn-primary" onclick="saveSettings()">Save Settings</button>
    </div>
  </div>
</div>

<!-- TOAST CONTAINER -->
<div class="toast-container" id="toast-container"></div>

<script>
// ─── STATE ──────────────────────────────────────────────────────────────────
let leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
let sortField = 'date';
let sortDir = -1;
let pendingDeleteId = null;

const COLORS = ['#4f46e5','#0284c7','#059669','#d97706','#dc2626','#7c3aed','#db2777','#0891b2'];
function avatarColor(name){ let h=0; for(let c of name)h=(h*31+c.charCodeAt(0))&0xffff; return COLORS[h%COLORS.length]; }
function initials(name){ return name.trim().split(/\s+/).map(w=>w[0]).join('').toUpperCase().slice(0,2); }
function fmtDate(iso){ const d=new Date(iso); return d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}); }
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2); }

// ─── STATS ───────────────────────────────────────────────────────────────────
function renderStats(){
  const total=leads.length, nw=leads.filter(l=>l.stage==='New').length,
    ct=leads.filter(l=>l.stage==='Contacted').length, cv=leads.filter(l=>l.stage==='Converted').length;
  document.getElementById('stats-row').innerHTML=`
    <div class="stat-card total"><div class="stat-label">Total Leads</div><div class="stat-value">${total}</div></div>
    <div class="stat-card new"><div class="stat-label">New</div><div class="stat-value">${nw}</div></div>
    <div class="stat-card contacted"><div class="stat-label">Contacted</div><div class="stat-value">${ct}</div></div>
    <div class="stat-card converted"><div class="stat-label">Converted</div><div class="stat-value">${cv}</div></div>
  `;
}

// ─── TABLE ───────────────────────────────────────────────────────────────────
function sourceBadge(s){
  const map={'Website Contact Form':'website','LinkedIn Inbound':'linkedin','Cold Email Outreach':'cold','Referral':'referral'};
  const cls=map[s]||'other';
  const lbl={'website':'Website','linkedin':'LinkedIn','cold':'Cold Email','referral':'Referral','other':s};
  return `<span class="badge badge-${cls}">${lbl[cls]||s}</span>`;
}
function stageBadge(s){
  const cls={New:'new',Contacted:'contacted',Converted:'converted',Lost:'lost'}[s]||'new';
  return `<span class="badge badge-${cls}">${s}</span>`;
}

function renderTable(){
  const q=document.getElementById('search-input').value.toLowerCase();
  const sf=document.getElementById('stage-filter').value;
  const so=document.getElementById('source-filter').value;
  const showAv=document.getElementById('s-avatars')?.checked!==false;

  let rows=[...leads];
  if(q) rows=rows.filter(l=>l.name.toLowerCase().includes(q)||l.email.toLowerCase().includes(q));
  if(sf) rows=rows.filter(l=>l.stage===sf);
  if(so) rows=rows.filter(l=>l.source===so);

  rows.sort((a,b)=>{
    let va=a[sortField]||'', vb=b[sortField]||'';
    return va<vb ? sortDir : va>vb ? -sortDir : 0;
  });

  const tbody=document.getElementById('leads-body');
  if(rows.length===0){
    tbody.innerHTML=`<tr><td colspan="7"><div class="empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/></svg>
      <p>No leads found. Add your first lead to get started.</p>
    </div></td></tr>`;
    return;
  }

  tbody.innerHTML=rows.map(l=>`
    <tr>
      <td style="color:var(--muted);font-size:12px;white-space:nowrap;">${fmtDate(l.date)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:9px;">
          ${showAv?`<div class="avatar" style="background:${avatarColor(l.name)}22;color:${avatarColor(l.name)};font-size:11px;">${initials(l.name)}</div>`:''}
          <div>
            <div style="font-weight:500;font-size:13px;">${esc(l.name)}</div>
          </div>
        </div>
      </td>
      <td style="color:var(--muted);font-size:13px;">${esc(l.email)}</td>
      <td>${sourceBadge(l.source)}</td>
      <td>
        <select class="filter-select" style="padding:4px 8px;font-size:12px;border-radius:99px;" onchange="quickStage('${l.id}',this.value)">
          ${['New','Contacted','Converted','Lost'].map(s=>`<option${l.stage===s?' selected':''}>${s}</option>`).join('')}
        </select>
      </td>
      <td style="max-width:180px;color:var(--muted);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(l.notes||'—')}</td>
      <td>
        <div class="actions">
          <button class="btn btn-outline btn-sm" onclick="openEdit('${l.id}')" title="Edit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </button>
          <button class="btn btn-outline btn-sm" style="color:var(--danger);border-color:var(--danger);" onclick="openDelete('${l.id}')" title="Delete">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function esc(s){ const d=document.createElement('div'); d.textContent=s||''; return d.innerHTML; }

// ─── SORT ────────────────────────────────────────────────────────────────────
function sortBy(f){ if(sortField===f) sortDir*=-1; else { sortField=f; sortDir=1; } renderTable(); }

// ─── ADD LEAD ────────────────────────────────────────────────────────────────
function openAddLead(){ document.getElementById('add-lead-panel').style.display=''; }
function closeAddLead(){ document.getElementById('add-lead-panel').style.display='none'; }

function addLead(){
  const name=document.getElementById('f-name').value.trim();
  const email=document.getElementById('f-email').value.trim();
  const source=document.getElementById('f-source').value;
  let ok=true;
  ['f-name','f-email'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el.value.trim()){ el.classList.add('error'); ok=false; } else el.classList.remove('error');
  });
  if(!ok){ toast('Please fill in required fields.','error'); return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ document.getElementById('f-email').classList.add('error'); toast('Enter a valid email.','error'); return; }

  const lead={ id:uid(), name, email, source, stage:'New', notes:'', date:new Date().toISOString(), history:[{time:new Date().toISOString(),text:'Lead created'}] };
  leads.unshift(lead);
  save();
  document.getElementById('f-name').value='';
  document.getElementById('f-email').value='';
  closeAddLead();
  if(document.getElementById('n-new')?.checked!==false) toast(`Lead "${name}" added successfully!`,'success');
  refresh();
}

// ─── QUICK STAGE ─────────────────────────────────────────────────────────────
function quickStage(id,stage){
  const l=leads.find(x=>x.id===id); if(!l) return;
  const old=l.stage; l.stage=stage;
  l.history.push({time:new Date().toISOString(),text:`Stage changed: ${old} → ${stage}`});
  save();
  if(document.getElementById('n-stage')?.checked!==false) toast(`"${l.name}" moved to ${stage}`,'info');
  refresh();
}

// ─── EDIT ────────────────────────────────────────────────────────────────────
let editId=null;
function openEdit(id){
  const l=leads.find(x=>x.id===id); if(!l) return;
  editId=id;
  document.getElementById('edit-name').value=l.name;
  document.getElementById('edit-email').value=l.email;
  document.getElementById('edit-source').value=l.source;
  document.getElementById('edit-stage').value=l.stage;
  document.getElementById('edit-notes').value=l.notes||'';
  renderHistory(l);
  document.getElementById('edit-modal').style.display='flex';
}
function renderHistory(l){
  const h=l.history||[];
  document.getElementById('edit-history').innerHTML=h.length?h.slice().reverse().map(e=>`
    <div class="log-entry">
      <span class="log-time">${new Date(e.time).toLocaleString('en-IN',{dateStyle:'short',timeStyle:'short'})}</span>
      <span class="log-text">${esc(e.text)}</span>
    </div>`).join(''):'<p style="font-size:12px;color:var(--muted);">No interactions logged yet.</p>';
}
function addLog(){
  const txt=document.getElementById('new-log').value.trim(); if(!txt) return;
  const l=leads.find(x=>x.id===editId); if(!l) return;
  l.history.push({time:new Date().toISOString(),text:txt});
  document.getElementById('new-log').value='';
  renderHistory(l);
  save();
}
function saveEdit(){
  const l=leads.find(x=>x.id===editId); if(!l) return;
  const name=document.getElementById('edit-name').value.trim();
  const email=document.getElementById('edit-email').value.trim();
  if(!name||!email){ toast('Name and email are required.','error'); return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ toast('Enter a valid email.','error'); return; }
  const oldStage=l.stage, newStage=document.getElementById('edit-stage').value;
  l.name=name; l.email=email; l.source=document.getElementById('edit-source').value;
  l.stage=newStage; l.notes=document.getElementById('edit-notes').value;
  if(oldStage!==newStage) l.history.push({time:new Date().toISOString(),text:`Stage changed: ${oldStage} → ${newStage}`});
  save(); closeEdit(); refresh(); toast('Lead updated.','success');
}
function closeEdit(){ document.getElementById('edit-modal').style.display='none'; }
function closeEditIfOutside(e){ if(e.target.id==='edit-modal') closeEdit(); }

// ─── DELETE ──────────────────────────────────────────────────────────────────
function openDelete(id){ pendingDeleteId=id; const l=leads.find(x=>x.id===id); document.getElementById('delete-name').textContent=l?.name||'this lead'; document.getElementById('delete-modal').style.display='flex'; }
function closeDelete(){ document.getElementById('delete-modal').style.display='none'; pendingDeleteId=null; }
function closeDeleteIfOutside(e){ if(e.target.id==='delete-modal') closeDelete(); }
function confirmDelete(){
  if(!pendingDeleteId) return;
  const l=leads.find(x=>x.id===pendingDeleteId);
  leads=leads.filter(x=>x.id!==pendingDeleteId);
  save(); closeDelete(); refresh();
  if(document.getElementById('n-del')?.checked!==false) toast(`"${l?.name}" deleted.`,'error');
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────
function openSettings(){ document.getElementById('settings-modal').style.display='flex'; }
function closeSettings(){ document.getElementById('settings-modal').style.display='none'; }
function closeSettingsIfOutside(e){ if(e.target.id==='settings-modal') closeSettings(); }
function switchTab(name){
  document.querySelectorAll('.tab').forEach((t,i)=>{ const tabs=['general','pipeline','notifications','data']; t.classList.toggle('active',tabs[i]===name); });
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id==='tab-'+name));
}
function saveSettings(){ closeSettings(); toast('Settings saved.','success'); }
function applyCompact(cb){
  document.querySelectorAll('tbody td').forEach(td=>td.style.padding=cb.checked?'7px 14px':'12px 14px');
}
function clearAllLeads(){
  if(!confirm('Delete ALL leads permanently?')) return;
  leads=[]; save(); closeSettings(); refresh(); toast('All leads cleared.','error');
}
function loadSampleData(){
  const samples=[
    {id:uid(),name:'Priya Sharma',email:'priya.sharma@techco.in',source:'LinkedIn Inbound',stage:'New',notes:'Interested in enterprise plan',date:new Date(Date.now()-5*86400000).toISOString(),history:[{time:new Date(Date.now()-5*86400000).toISOString(),text:'Lead created via LinkedIn'}]},
    {id:uid(),name:'Arjun Mehta',email:'arjun@startuphub.io',source:'Website Contact Form',stage:'Contacted',notes:'Sent proposal on 3 Jun',date:new Date(Date.now()-10*86400000).toISOString(),history:[{time:new Date(Date.now()-10*86400000).toISOString(),text:'Lead created'},{time:new Date(Date.now()-8*86400000).toISOString(),text:'Sent introduction email'},{time:new Date(Date.now()-6*86400000).toISOString(),text:'Stage changed: New → Contacted'}]},
    {id:uid(),name:'Sneha Iyer',email:'sneha.iyer@designlab.com',source:'Referral',stage:'Converted',notes:'Signed 6-month contract',date:new Date(Date.now()-20*86400000).toISOString(),history:[{time:new Date(Date.now()-20*86400000).toISOString(),text:'Lead created via Referral'},{time:new Date(Date.now()-15*86400000).toISOString(),text:'Discovery call completed'},{time:new Date(Date.now()-10*86400000).toISOString(),text:'Proposal sent'},{time:new Date(Date.now()-5*86400000).toISOString(),text:'Stage changed: Contacted → Converted'}]},
    {id:uid(),name:'Rahul Nair',email:'rahul.n@logix.co',source:'Cold Email Outreach',stage:'New',notes:'',date:new Date(Date.now()-2*86400000).toISOString(),history:[{time:new Date(Date.now()-2*86400000).toISOString(),text:'Lead created via cold email'}]},
    {id:uid(),name:'Meera Pillai',email:'meera@cloudventures.in',source:'LinkedIn Inbound',stage:'Lost',notes:'Chose competitor',date:new Date(Date.now()-30*86400000).toISOString(),history:[{time:new Date(Date.now()-30*86400000).toISOString(),text:'Lead created'},{time:new Date(Date.now()-12*86400000).toISOString(),text:'Stage changed: Contacted → Lost'}]},
  ];
  leads=[...samples,...leads]; save(); closeSettings(); refresh(); toast('Sample data loaded!','success');
}

// ─── EXPORT ──────────────────────────────────────────────────────────────────
function exportCSV(){
  const headers=['Date','Name','Email','Source','Stage','Notes'];
  const rows=leads.map(l=>[fmtDate(l.date),l.name,l.email,l.source,l.stage,(l.notes||'').replace(/"/g,'""')].map(v=>`"${v}"`).join(','));
  const csv=[headers.join(','),...rows].join('\n');
  const blob=new Blob([csv],{type:'text/csv'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='leads-export.csv'; a.click();
  if(document.getElementById('n-export')?.checked!==false) toast('CSV exported successfully.','success');
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
function toast(msg,type='info'){
  const el=document.createElement('div'); el.className=`toast ${type}`; el.textContent=msg;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(()=>el.remove(),3200);
}

// ─── SAVE / REFRESH ──────────────────────────────────────────────────────────
function save(){ localStorage.setItem('crm_leads',JSON.stringify(leads)); }
function refresh(){ renderStats(); renderTable(); }

// ─── INIT ────────────────────────────────────────────────────────────────────
refresh();
if(leads.length===0){
  setTimeout(()=>toast('No leads yet — click "Add New Lead" or load sample data in Settings → Data.','info'),600);
}
</script>
</body>
</html>