// models/alerts.js

import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  alertType: { type: String, required: true },
  content: { type: String, required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateSent: { type: Date, default: Date.now },
  count: {type: Number},
  isRead: { type: Boolean, default: false },
});

const Alert = mongoose.model('Alerts', alertSchema);

export default Alert;
