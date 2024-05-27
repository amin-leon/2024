import mongoose from 'mongoose';
import Feedback from '../models/Feedback.js';
import Issue from '../models/Issue.js';
import User from '../models/User.js';

// Controller to create a new feedback
const createFeedback = async (req, res) => {
    // Extract data from request
    const { issueId, reporter, assignedStaff, feedbackMessage, reason, wantToGoHigher } = req.body;

    try {
        // Create a new feedback instance
        const feedback = new Feedback({
            issueId,
            reporter,
            assignedStaff,
            reason,
            feedbackMessage,
            wantToGoHigher
        });

        // Save the feedback to the database
        await feedback.save();

        res.status(201).json({ message: 'Feedback created successfully.', feedback });
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ error: 'Could not create feedback.' });
    }
};

// Controller to update a feedback
const updateFeedback = async (req, res) => {
    // Extract parameters from request
    const { feedbackId } = req.params;
    const { assignedStaff } = req.body;

    try {
        // Find the feedback by ID and update it
        const feedback = await Feedback.findByIdAndUpdate(
            feedbackId,
            { assignedStaff },
            { new: true }
        );

        res.json({ message: 'Feedback updated successfully.', feedback });
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ error: 'Could not update feedback.' });
    }
};

// Controller to delete a feedback
const deleteFeedback = async (req, res) => {
    // Extract parameters from request
    const { feedbackId } = req.params;

    try {
        // Find the feedback by ID and delete it
        const feedback = await Feedback.findByIdAndDelete(feedbackId);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found.' });
        }

        res.json({ message: 'Feedback deleted successfully.', feedback });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'An error occurred while deleting the feedback.' });
    }
};


const getFeedbackByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId' });
        }

        // Convert userId to ObjectId
        const userIdObjectId = new mongoose.Types.ObjectId(userId);
        const feedbacks = await Feedback.find({ assignedStaff: userIdObjectId });

        // Fetch information about the corresponding issues and reporters
        const populatedFeedbacks = await Promise.all(feedbacks.map(async (feedback) => {
            const issue = await Issue.findById(feedback.issueId);
            const reporter = await User.findById(feedback.reporter);

            // Construct the populated feedback object profile
            const populatedFeedback = {
                _id: feedback._id,
                issueId: feedback.issueId,
                issueTitle: issue ? issue.title : 'Issue not found',
                feedbackText: feedback.feedbackMessage,
                wantToGoHigher: feedback.wantToGoHigher,
                createdAt: feedback.createdAt,
                reporterName: reporter ? reporter.fullName : 'Reporter not found',
                reporterImage: reporter ? reporter.profile : null
            };

            return populatedFeedback;
        }));

        res.status(200).json(populatedFeedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// when user read feedback
const updateFeedbackIsRead = async (req, res) => {
    try {
      const { feedbackId } = req.params;
  
      await Feedback.findByIdAndUpdate(feedbackId, { isRead: true }, {new: true});
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating feedback Read:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateAssignedToDuringEscalation = async (req, res) => {
    try {
        const { issueId, assignedTo } = req.params;
        const updatedIssue = await Issue.findByIdAndUpdate(issueId, { assignedTo: assignedTo , status: 'assigned'}, { new: true });

        // Assuming the feedback document has a field named 'issueId' to reference the related issue
       await Feedback.findByIdAndDelete(issueId);

        res.json(updatedIssue);
    } catch (error) {
        console.error('Error updating assignedTo field:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export default {
    updateAssignedToDuringEscalation,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackByUserId,
    updateFeedbackIsRead
};
