const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fallback MongoDB connection string if .env is missing
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://adeebny2005_db_user:<db_password>@cluster0.emu3i5n.mongodb.net/?appName=Cluster0";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected safely to MongoDB Atlas'))
  .catch(err => console.error('❌ Database connection error:', err));

// Define the Schema for our Leads
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  source: { type: String, default: 'Website Form' },
  status: { type: String, enum: ['New', 'Contacted', 'Converted'], default: 'New' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// --- API ENDPOINTS (CRUD Operations) ---

// 1. Get all leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Create a new lead
app.post('/api/leads', async (req, res) => {
  const { name, email, source, notes } = req.body;
  const newLead = new Lead({ name, email, source, notes });
  try {
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Update a lead's status or notes
app.patch('/api/leads/:id', async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Returns the modified document rather than the original
    );
    res.json(updatedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Delete a lead
app.delete('/api/leads/:id', async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead successfully archived/deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve static frontend assets if we bundle them together
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`🚀 Server running smoothly on port ${PORT}`);
});