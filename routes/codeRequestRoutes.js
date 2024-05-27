// codeRequestRoutes.js
import express from 'express';
import { createCodeRequest, deleteCodeRequest, confirmCodeRequest, getAllCodeRequests, getSingleCodeRequests } from '../controllers/codeRequestController.js'; 

const router = express.Router();

// Endpoint for handling code requests
router.post('/new-code-request',  createCodeRequest);
router.put('/confirm-code-request/:codeRequestId', confirmCodeRequest);
router.delete('/delete-code-request/:codeRequestId', deleteCodeRequest);
router.get('/all-code-requests', getAllCodeRequests);
router.get('/single-code-request/:requesterId', getSingleCodeRequests);




export default router;
