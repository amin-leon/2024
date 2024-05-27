import express from 'express';
import docsController from '../controllers/SharedDocsController.js';
import upload from '../middleware/upload.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

// POST endpoint to upload a document
router.post('/upload', AuthMiddleware.isAuthenticated, AuthMiddleware.checkRole(['Student', 'Staff']), upload.single('document'), docsController.uploadDocument);

// DELETE endpoint to delete a document
router.delete('/documents/delete/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.checkRole(['Student', 'Staff']), docsController.deleteDocument);

// GET endpoint to get all documents
router.get('/documents', docsController.getAllDocuments);

router.get('/documents/:issueId', docsController.getDocumentsByIssueId);


export default router;
