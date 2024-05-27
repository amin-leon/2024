// server.js

import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import alertRoutes from './routes/alertSRoutes.js'
import cors from 'cors'
import staffRoutes from './routes/staffRoutes.js'
import positionsRoutes from './routes/positionsRoutes.js'
import codeRequestRoutes from './routes/codeRequestRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'
import docsRoutes from './routes/SharedDocsRoutes.js'
import { schedulePendingIssueReminder } from './auto/Schedule.js';
import { notifyAssignedStaff } from './auto/StaffSchedule.js';






const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());


app.use('/auth', authRoutes);
app.use('/issue', issueRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/docs', docsRoutes);
app.use('/notifications', notificationRoutes);
app.use("/api/school", staffRoutes);
app.use("/api/school", positionsRoutes);
app.use('/api/code', codeRequestRoutes);
app.use('/alerts',alertRoutes);

schedulePendingIssueReminder()
notifyAssignedStaff()



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
