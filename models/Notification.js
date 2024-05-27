// models/notification.js

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  notificationType: { type: String, required: true },
  content: { type: String, required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateSent: { type: Date, default: Date.now },
  link: {type: String},
  isRead: { type: Boolean, default: false },
  relatedIssue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
