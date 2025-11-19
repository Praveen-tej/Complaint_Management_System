const mongoose = require('mongoose');
const ComplaintSchema = new mongoose.Schema({
  department: { type: String, required: true },
  complaintText: { type: String, required: true },
  status: { type: String, default: 'pending' }, 
  response: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Complaint', ComplaintSchema);