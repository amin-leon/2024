import Notification from '../models/Notification.js';
import Alert from '../models/Alerts.js';


const getNotificationsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const notifications = await Notification.find({ $or: [{ recipient: userId }, { sender: userId }] });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// when user read notification
const updateNotificationIsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Assuming you have a Notification model with an 'isRead' field
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating notification status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllAlerts = async (req, res) => {
  try {
    const recipient = req.params.recipient;

    const alerts = await Notification.deleteMany({recipient: recipient });
    res.status(200).json({mesage: "Data deleted very well"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getNotificationsByUser,
  updateNotificationIsRead,
  fetchAllAlerts,
  deleteAllAlerts
};
