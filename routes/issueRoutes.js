// routes/issues.js

import express from 'express';
import issueController from '../controllers/issueController.js';
import upload from '../middleware/upload.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';



const router = express.Router();


router.post('/new-issue', AuthMiddleware.isAuthenticated, AuthMiddleware.checkRole(['Student']), upload.single('attachment'), issueController.createIssue);
router.post('/add-attachment/:issueId', upload.single('attachment'), issueController.addAttachment);
router.delete('/attachments/:issueId/:attachmentId', issueController.deleteAttachment);
router.put('/assign/:issueId',AuthMiddleware.isAuthenticated, AuthMiddleware.checkRole(['Admin']), issueController.updateAssignedTo);
router.put('/status/:issueId', issueController.updateIssueStatus);
router.put('/escalate/:issueId', issueController.EscalateIssue);
router.put('/share/:issueId', issueController.ShareIssueToChatRoom);
router.put('/remove/:issueId', issueController.RemoveIssueToChatRoom);
router.put('/edit/:id',upload.single('attachments'), issueController.updateIssue);
router.put('/reject-issue/:id', issueController.rejectIssue);
router.get('/view/:id', issueController.getIssueDetails);
router.get('/reporter/:reporterId', issueController.getIssuesByReporterId);
router.get('/assigned-staff/:assignedToId', issueController.getIssuesByAssignedId);
router.get('/all-issues', issueController.getAllIssues);
router.get('/chatroom-issues', issueController.getAllIssuesInChatRoom);
router.delete('/delete/:id', issueController.deleteIssueById);
router.post('/chatroom/:issueId/comments', issueController.addCommentInGroup);
router.post('/staff-student-chat/:issueId/comments', issueController.addCommentInStaffStudentChat);
router.get('/chatroom/:issueId/comments', issueController.getCommentsByIssueId);
router.get('/staff-student-chat/:issueId/comments', issueController.getStaffStudentCommentsByIssueId);
router.put('/mark-as-read/:issueId', issueController.markIssueAsRead);
router.put('/close/:issueId/:reporterId', AuthMiddleware.isAuthenticated, AuthMiddleware.checkRole(['Staff']), issueController.closeIssue);




router.get('/open', issueController.getOpenIssues);



export default router;
