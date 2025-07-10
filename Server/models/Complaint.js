const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  department: { type: String, required: true },
  complaintText: { type: String, required: true },
  status: { type: String, default: 'pending' }, // e.g., pending, resolved
  response: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
  // Do NOT store student name/email here for anonymity
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
