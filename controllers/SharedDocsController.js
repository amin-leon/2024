import Docs from '../models/SharedDocs.js';

// Controller for uploading a document
const uploadDocument = async (req, res) => {
    try {
        const { issueId, posterUser } = req.body;
        const document = req.file.path;

        const newDoc = new Docs({ issueId, posterUser, document });
        await newDoc.save();


        res.status(201).json({ message: 'Document uploaded successfully', newDoc });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


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

export default {
    uploadDocument,
    deleteDocument,
    getAllDocuments,
    getDocumentsByIssueId
};

