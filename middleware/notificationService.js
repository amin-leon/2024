// notificationService.js

import User from '../models/User.js';
import Notification from '../models/Notification.js';

const notifyAllStudentsAboutNewPost = async (post) => {
  try {
    const students = await User.find({ role: 'student' }); // Adjust this based on your user structure

    // Create a notification for each student
    const notifications = students.map(async (student) => {
      await new Notification({
        notificationType: 'New Post',
        content: `A new post titled "${post.title}" has been created.`,
        sender: post.postedBy, // Adjust this based on the sender information in your post
        recipient: student._id,
      }).save();
    });

    await Promise.all(notifications);
  } catch (error) {
    console.error('Error sending notifications to students:', error);
  }
};

export  { notifyAllStudentsAboutNewPost };
