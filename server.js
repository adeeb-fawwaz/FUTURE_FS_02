const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// DATA STORE & SCHEMA LAYER (Fulfilling Task 2 Requirements)
// ---------------------------------------------------------
// In-Memory Data Store representing our Database Collection
let leads = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        source: "Website Contact Form",
        status: "new",
        notes: ["Initial form submission received."],
        createdAt: new Date()
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        source: "LinkedIn Campaign",
        status: "contacted",
        notes: ["Sent follow-up email regarding services."],
        createdAt: new Date()
    }
];

// ---------------------------------------------------------
// API ROUTES
// ---------------------------------------------------------

// 1. Root Welcome Route (What you see in image_292a20.png)
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the Client Lead Management System (Mini CRM) API!",
        status: "Server is up and running smoothly",
        endpoints: {
            getAllLeads: "GET /api/leads",
            createNewLead: "POST /api/leads",
            updateStatus: "PATCH /api/leads/:id/status",
            addNotes: "POST /api/leads/:id/notes"
        }
    });
});

// 2. FEATURE: Lead Listing (GET /api/leads)
// Retrieves all client leads from the system
app.get('/api/leads', (req, res) => {
    res.status(200).json({
        success: true,
        count: leads.length,
        data: leads
    });
});

// 3. FEATURE: Create New Lead (POST /api/leads)
// Simulates a lead generated from website contact forms
app.post('/api/leads', (req, res) => {
    const { name, email, source } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Please provide both name and email for the lead."
        });
    }

    const newLead = {
        id: (leads.length + 1).toString(),
        name,
        email,
        source: source || "Website Contact Form",
        status: "new", // default status
        notes: ["Lead registered in CRM system."],
        createdAt: new Date()
    };

    leads.push(newLead);
    res.status(201).json({
        success: true,
        message: "Lead created successfully!",
        data: newLead
    });
});

// 4. FEATURE: Lead Status Updates (PATCH /api/leads/:id/status)
// Updates status between (new / contacted / converted)
app.patch('/api/leads/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['new', 'contacted', 'converted'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status. Allowed values are: new, contacted, converted."
        });
    }

    const lead = leads.find(l => l.id === id);
    if (!lead) {
        return res.status(404).json({
            success: false,
            message: `Lead with ID ${id} not found.`
        });
    }

    lead.status = status;
    lead.notes.push(`Status manually updated to: ${status} on ${new Date().toISOString()}`);

    res.status(200).json({
        success: true,
        message: "Lead status updated successfully!",
        data: lead
    });
});

// 5. FEATURE: Notes & Follow-ups (POST /api/leads/:id/notes)
// Appends follow-up notes to a specific lead
app.post('/api/leads/:id/notes', (req, res) => {
    const { id } = req.params;
    const { note } = req.body;

    if (!note) {
        return res.status(400).json({
            success: false,
            message: "Note content cannot be empty."
        });
    }

    const lead = leads.find(l => l.id === id);
    if (!lead) {
        return res.status(404).json({
            success: false,
            message: `Lead with ID ${id} not found.`
        });
    }

    lead.notes.push(note);
    res.status(200).json({
        success: true,
        message: "Follow-up note added successfully!",
        data: lead
    });
});

// Start listening for active requests
app.listen(PORT, () => {
    console.log(`CRM Backend Service actively listening on port ${PORT}`);
});