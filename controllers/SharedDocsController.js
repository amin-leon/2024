import Docs from '../models/SharedDocs.js';
import Issue from '../models/Issue.js';
import { createNotification } from '../helpers/Nofication.js'

// Controller for deleting a document
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        await Docs.findByIdAndDelete(id);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller for getting all documents
const getAllDocuments = async (req, res) => {
    try {
        const allDocs = await Docs.find();
        res.status(200).json(allDocs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getDocumentsByIssueId = async (req, res) => {
    const { issueId } = req.params;

    try {
        // Find documents that match the issueId
        const documents = await Docs.find({ issueId });

        if (!documents) {
            return res.status(404).json({ message: 'Documents not found' });
        }

        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// upload docs
const uploadDocument = async (req, res) => {
    try {
        const { issueId, posterUser } = req.body;
        const document = req.file.path;


        const newDoc = new Docs({ issueId, posterUser, document });
        await newDoc.save();

        // Retrieve the issue details
        const issue = await Issue.findById(issueId);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }


        const { assignedTo, reporter } = issue;
        console.log("Heeelloooooooooooooooooooooooooooooooo", reporter, assignedTo)


        // Determine the recipient of the notification
        let recipientId;
        let content;

        if (posterUser === assignedTo.toString()) {
            recipientId = reporter;
            content = 'A new document has been uploaded to your issue.';
        } else if (posterUser === reporter.toString()) {
            recipientId = assignedTo;
            content = 'A new document has been uploaded by the requester.';
        } else {
            return res.status(400).json({ message: 'Invalid poster user' , posterUser, assignedTo});
        }


        // Send notification
        const notificationType = 'Document Uploaded';
        const link = `/documents/${newDoc._id}`;
        const relatedIssue = issueId;

        await createNotification(notificationType, content, recipientId, link, relatedIssue);

        res.status(201).json({ message: 'Document uploaded successfully', newDoc });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    uploadDocument,
    deleteDocument,
    getAllDocuments,
    getDocumentsByIssueId,
    uploadDocument
};

