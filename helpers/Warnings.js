import Alert from "../models/Alerts.js";

export const createWarning = async (warningType, content, recipientId, pendingIssuesCount) => {
    const warning = new Alert({
      alertType:warningType,
      content,
      recipient: recipientId,
      count: pendingIssuesCount,
    });
    await warning.save();
  };