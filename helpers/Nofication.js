import Notification from "../models/Notification.js";

export const createNotification = async (notificationType, content, recipientId, link, relatedIssue) => {
    const notification = new Notification({
      notificationType,
      content,
      recipient: recipientId,
      link: link,
      relatedIssue: relatedIssue
    });
    await notification.save();
  };
  
  // Usage example
//   await createNotification('IssueCreated', 'New issue created', adminUser._id);
  