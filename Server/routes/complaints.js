const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Submit a new complaint
router.post('/', async (req, res) => {
  try {
    const { department, complaintText } = req.body;
    const complaint = new Complaint({ department, complaintText });
    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Get complaints for a department (for admin)
router.get('/:department', async (req, res) => {
  try {
    const department = req.params.department.toLowerCase();
    const complaints = await Complaint.find({ department });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark a complaint as resolved
router.patch('/resolve/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a complaint by ID
router.delete('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({ message: "Complaint removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
