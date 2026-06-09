const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// IN-MEMORY DATABASE SCHEMA & INITIAL DATA (Task 2 Specs)
// ---------------------------------------------------------
let leads = [
    {
        id: "1",
        name: "Aravind Kumar",
        email: "aravind.k@example.com",
        source: "Website Contact Form",
        status: "new",
        notes: ["Form submitted seeking custom software pricing."],
        createdAt: "2026-06-09"
    },
    {
        id: "2",
        name: "Sarah Jenkins",
        email: "sarah.j@example.com",
        source: "LinkedIn Campaign",
        status: "contacted",
        notes: ["Sent initial introduction deck.", "Scheduled follow-up call."],
        createdAt: "2026-06-08"
    },
    {
        id: "3",
        name: "Michael Chang",
        email: "m.chang@example.com",
        source: "Partner Referral",
        status: "converted",
        notes: ["Contract signed successfully!"],
        createdAt: "2026-06-05"
    }
];

// ---------------------------------------------------------
// BACKEND API ENDPOINTS (CRUD Workflows)
// ---------------------------------------------------------

// API: Get all leads
app.get('/api/leads', (req, res) => {
    res.json(leads);
});

// API: Create a new lead from a form
app.post('/api/leads', (req, res) => {
    const { name, email, source } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required." });
    }
    const newLead = {
        id: (leads.length + 1).toString(),
        name,
        email,
        source: source || "Website Contact Form",
        status: "new",
        notes: ["Lead recorded in database."],
        createdAt: new Date().toISOString().split('T')[0]
    };
    leads.unshift(newLead); // Add to the top
    res.status(201).json(newLead);
});

// API: Update Lead Status (new / contacted / converted)
app.patch('/api/leads/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const lead = leads.find(l => l.id === id);
    
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    
    lead.status = status;
    lead.notes.push(`Status changed to ${status}`);
    res.json(lead);
});

// API: Add a Note to a Lead
app.post('/api/leads/:id/notes', (req, res) => {
    const { id } = req.params;
    const { note } = req.body;
    const lead = leads.find(l => l.id === id);
    
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    if (!note) return res.status(400).json({ error: "Note text required" });
    
    lead.notes.push(note);
    res.json(lead);
});

// ---------------------------------------------------------
// PROFESSIONAL FRONTEND UI ROUTE (HTML / CSS / JS Dashboard)
// ---------------------------------------------------------
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Client Lead Management System - Mini CRM</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <style>
            :root {
                --bg-primary: #f4f6f9;
                --sidebar-bg: #1e1e2f;
                --card-bg: #ffffff;
                --text-main: #333333;
                --primary-color: #4e73df;
                --success-color: #1cc88a;
                --warning-color: #f6c23e;
            }
            * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            body { display: flex; background: var(--bg-primary); color: var(--text-main); height: 100vh; overflow: hidden; }
            
            /* Sidebar Styling */
            .sidebar { width: 260px; background: var(--sidebar-bg); color: #fff; padding: 20px; display: flex; flex-direction: column; gap: 20px; }
            .sidebar h2 { font-size: 20px; text-align: center; color: var(--primary-color); font-weight: 700; border-bottom: 1px solid #3a3a54; padding-bottom: 15px; }
            .nav-item { display: flex; align-items: center; gap: 10px; padding: 12px; color: #b3b3c6; text-decoration: none; border-radius: 8px; transition: 0.3s; font-weight: 500; }
            .nav-item.active, .nav-item:hover { background: rgba(255,255,255,0.1); color: #fff; }
            
            /* Main Dashboard Content */
            .main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
            header { background: var(--card-bg); padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e3e6f0; }
            .user-profile { display: flex; align-items: center; gap: 10px; font-weight: 600; }
            .container { padding: 30px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 30px; }
            
            /* Forms and Actions Layout */
            .top-actions { display: grid; grid-template-columns: 1fr 2fr; gap: 20px; }
            .form-card { background: var(--card-bg); padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e3e6f0; }
            .form-card h3 { margin-bottom: 15px; font-size: 18px; color: #4e73df; }
            .form-group { margin-bottom: 15px; display: flex; flex-direction: column; gap: 5px; }
            .form-group label { font-size: 13px; font-weight: 600; color: #6e707e; }
            .form-group input, .form-group select { padding: 10px; border: 1px solid #d1d3e2; border-radius: 6px; font-size: 14px; outline: none; }
            .btn { background: var(--primary-color); color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: 600; width: 100%; transition: 0.3s; }
            .btn:hover { background: #2e59d9; }
            
            /* Table Styling */
            .table-container { background: var(--card-bg); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e3e6f0; overflow: hidden; }
            table { width: 100%; border-collapse: collapse; text-align: left; }
            th { background: #f8f9fc; padding: 15px; font-weight: 600; color: #4e73df; border-bottom: 2px solid #e3e6f0; }
            td { padding: 15px; border-bottom: 1px solid #e3e6f0; font-size: 14px; vertical-align: middle; }
            
            /* Badges */
            .badge { padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; display: inline-block; }
            .badge-new { background: #e7f1ff; color: #0d6efd; }
            .badge-contacted { background: #fff3cd; color: #856404; }
            .badge-converted { background: #d1e7dd; color: #0f5132; }
            
            /* Actions inside table */
            .action-select { padding: 6px; border-radius: 4px; border: 1px solid #d1d3e2; font-size: 12px; margin-right: 5px; }
            .note-input { padding: 6px; border: 1px solid #d1d3e2; border-radius: 4px; font-size: 12px; width: 150px; }
            .btn-small { background: #36b9cc; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px; }
            .btn-small:hover { background: #2c9faf; }
            .notes-list { font-size: 11px; color: #858796; list-style-type: square; margin-top: 5px; padding-left: 15px; }
        </style>
    </head>
    <body>
        <!-- Sidebar Navigation -->
        <div class="sidebar">
            <h2><i class="fa-solid from-neutral-500 fa-chart-line"></i> FUTURE CRM</h2>
            <a href="#" class="nav-item active"><i class="fa-solid fa-users"></i> Lead Management</a>
            <a href="#" class="nav-item"><i class="fa-solid fa-gears"></i> Settings</a>
            <div style="margin-top:auto; font-size:12px; color:#6e707e; text-align:center;">Task 2 Submission Portfolio</div>
        </div>

        <div class="main-content">
            <!-- Top Header -->
            <header>
                <h2>Client Lead Management Dashboard</h2>
                <div class="user-profile">
                    <i class="fa-solid fa-user-tie fa-lg" style="color: #4e73df;"></i>
                    <span>Admin Panel</span>
                </div>
            </header>

            <!-- Dashboard App Workspace -->
            <div class="container">
                <div class="top-actions">
                    <!-- Add Lead Form Feature -->
                    <div class="form-card">
                        <h3><i class="fa-solid fa-user-plus"></i> Capture New Lead</h3>
                        <form id="leadForm">
                            <div class="form-group">
                                <label>Client Name</label>
                                <input type="text" id="clientName" placeholder="e.g. John Doe" required>
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="email" id="clientEmail" placeholder="name@company.com" required>
                            </div>
                            <div class="form-group">
                                <label>Lead Source</label>
                                <select id="leadSource">
                                    <option value="Website Contact Form">Website Contact Form</option>
                                    <option value="LinkedIn Inbound">LinkedIn Inbound</option>
                                    <option value="Cold Email Outreach">Cold Email Outreach</option>
                                </select>
                            </div>
                            <button type="submit" class="btn">Add Client Lead</button>
                        </form>
                    </div>

                    <!-- Informational Banner -->
                    <div class="form-card" style="display:flex; flex-direction:column; justify-content:center; background:linear-gradient(135deg, #4e73df 0%, #224abe 100%); color:white;">
                        <h2 style="margin-bottom:10px;">Operational Status Live</h2>
                        <p style="opacity:0.9; font-size:14px; line-height:1.6;">
                            This dashboard orchestrates client intake channels, allows dynamic updates to current pipeline status (New / Contacted / Converted), and manages historical notes required for organizational tracking.
                        </p>
                    </div>
                </div>

                <!-- Main Interactive Table Feature -->
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client Details</th>
                                <th>Source</th>
                                <th>Pipeline Status</th>
                                <th>Notes & History Tracking</th>
                                <th>Management Control Actions</th>
                            </tr>
                        </thead>
                        <tbody id="leadsTableBody">
                            <!-- Injected dynamically via client JavaScript API calls -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- AJAX Engine to coordinate state updates directly with your backend API -->
        <script>
            const API_BASE = window.location.origin;

            // Fetch and render data from the database
            async function loadLeads() {
                const response = await fetch(\`\${API_BASE}/api/leads\`);
                const leads = await response.json();
                const tbody = document.getElementById('leadsTableBody');
                tbody.innerHTML = '';

                leads.forEach(lead => {
                    const tr = document.createElement('tr');
                    
                    // Create Notes List structure
                    let notesHTML = '<ul class="notes-list">';
                    lead.notes.forEach(n => { notesHTML += \`<li>\${n}</li>\`; });
                    notesHTML += '</ul>';

                    tr.innerHTML = \`
                        <td>\${lead.createdAt}</td>
                        <td>
                            <strong>\${lead.name}</strong><br>
                            <span style="font-size:12px; color:#858796;">\${lead.email}</span>
                        </td>
                        <td>\${lead.source}</td>
                        <td><span class="badge badge-\${lead.status}">\${lead.status}</span></td>
                        <td>
                            <div style="max-height: 80px; overflow-y:auto;">\${notesHTML}</div>
                        </td>
                        <td>
                            <div style="display:flex; flex-direction:column; gap:5px;">
                                <div>
                                    <select class="action-select" onchange="updateStatus('\${lead.id}', this.value)">
                                        <option value="">-- Change Status --</option>
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="converted">Converted</option>
                                    </select>
                                </div>
                                <div style="display:flex; gap:3px; margin-top:2px;">
                                    <input type="text" class="note-input" placeholder="Add custom note..." id="note-\${lead.id}">
                                    <button class="btn-small" onclick="addNote('\${lead.id}')">Save</button>
                                </div>
                            </div>
                        </td>
                    \`;
                    tbody.appendChild(tr);
                });
            }

            // Submit New Lead Form
            document.getElementById('leadForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById('clientName').value;
                const email = document.getElementById('clientEmail').value;
                const source = document.getElementById('leadSource').value;

                await fetch(\`\${API_BASE}/api/leads\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, source })
                });

                document.getElementById('leadForm').reset();
                loadLeads();
            });

            // Action Handler: Update Pipeline Status
            async function updateStatus(id, newStatus) {
                if(!newStatus) return;
                await fetch(\`\${API_BASE}/api/leads/\${id}/status\`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });
                loadLeads();
            }

            // Action Handler: Append Notes
            async function addNote(id) {
                const input = document.getElementById(\`note-\${id}\`);
                const noteText = input.value.trim();
                if(!noteText) return;

                await fetch(\`\${API_BASE}/api/leads/\${id}/notes\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ note: noteText })
                });
                
                input.value = '';
                loadLeads();
            }

            // Bootstrap application
            loadLeads();
        </script>
    </body>
    </html>
    `);
});

// Start listening for requests
app.listen(PORT, () => {
    console.log(`CRM Backend Service running on port ${PORT}`);
});