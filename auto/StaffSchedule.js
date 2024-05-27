import cron from 'node-cron';
import { EventEmitter } from 'events';
import Issue from '../models/Issue.js';
import User from '../models/User.js';
import { createWarning } from '../helpers/Warnings.js';
import Alert from '../models/Alerts.js';

const eventEmitter = new EventEmitter();

const notifyAssignedStaff = () => {
  cron.schedule('* * * * * *', async () => {
    try {
      // Step 1: Get all staff users
      const staffUsers = await User.find({ role: 'Staff' });
      if (!staffUsers.length) {
        console.error('No staff users found.');
        return;
      }

      // Get all staff user IDs
      const staffUserIds = staffUsers.map(user => user._id);

      // Step 2: Find issues assigned to these staff users
      const issues = await Issue.find({ assignedTo: { $in: staffUserIds }, status: 'assigned' });

      // Create a mapping of user IDs to the number of issues assigned to them
      const userIssueCount = {};
      issues.forEach(issue => {
        userIssueCount[issue.assignedTo] = (userIssueCount[issue.assignedTo] || 0) + 1;
      });

      // Step 3: Create a warning for each staff user with the number of issues assigned to them
      for (const [userId, issueCount] of Object.entries(userIssueCount)) {

        // Delete previous warnings
        await Alert.deleteMany({ recipient: userId });
        await createWarning(
          'Reminder', 
          `You have ${issueCount} open issue(s) to work on.`,
          userId,
          issueCount
        );
      }

    } catch (error) {
      console.error('Error scheduling pending issue reminder:', error)
    }
  });
};

export { eventEmitter, notifyAssignedStaff };
