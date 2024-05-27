import Alert from "../models/Alerts.js";


export const fetchAllAlerts = async (req, res) => {
  const { recipientId } = req.params;
  try {
    const alerts = await Alert.find({ recipient: recipientId });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAlert = async (req, res) => {
  const { recipient } = req.params;
  
  try {
    const alert = await Alert.findOneAndDelete(recipient);

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.status(200).json({ message: "Alert deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  export default {
    fetchAllAlerts,
    deleteAlert
  }