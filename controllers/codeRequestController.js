// codeRequestController.js
import { createNotification } from "../helpers/Nofication.js";
import CodeRequest from "../models/CodeRequestModel.js";
import User from "../models/User.js";


const createCodeRequest = async (req, res) => {
  try {
    // Extract data from the request
    const { staff, reason, requester, why } = req.body;

    // Check if there is an existing code request with the same staff and requester
    const existingCodeRequest = await CodeRequest.findOne({ staff, requester });

    if (existingCodeRequest) {
      return res.status(400).json({ message: 'Channel already exists' });
    }

    // Create a new code request
    const newCodeRequest = new CodeRequest({
      staff,
      reason,
      requester,
      why
    });

    // Save the code request to the database
    await newCodeRequest.save();

    // Send notification to admin-middleman
    const adminUser = await User.findOne({ role: 'Admin' });
    if (adminUser) {
      await createNotification('code requested', 'Student is requesting new channel', adminUser._id, 'http://localhost:3000/Home/admin/manage/requests', );
    } else {
      console.log('Admin user not found');
    }

    res.status(201).json({ message: 'Code request created successfully' });
  } catch (error) {
    console.error('Error creating code request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const confirmCodeRequest = async (req, res) => {
  try {
    const { codeRequestId } = req.params;

    // Update the code request status to "Approved" and set the confirmedBy field
    const updatedCodeRequest = await CodeRequest.findByIdAndUpdate(
      codeRequestId,
      { status: 'Approved' },
      { new: true }
    );

    if (!updatedCodeRequest) {
      return res.status(404).json({ message: 'Code request not found' });
    }

    // Send notification to the user (requester)
    const requesterUser = await User.findById(updatedCodeRequest.requester);
    if (requesterUser) {
      await createNotification('code confirmed', 'The new channel for you has been initiated', requesterUser._id, 'http://localhost:3000/Home/user/manage/requests');
    } else {
      console.log('Requester user not found');
    }

    res.status(200).json({ message: 'Code request confirmed successfully' });
  } catch (error) {
    console.error('Error confirming code request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


  const deleteCodeRequest = async (req, res) => {
    try {
      const { codeRequestId } = req.params;
  
      // Find and delete the code request
      const deletedCodeRequest = await CodeRequest.findByIdAndDelete(codeRequestId);
  
      if (!deletedCodeRequest) {
        return res.status(404).json({ message: 'Code request not found' });
      }
  
      res.status(200).json({ message: 'Code request deleted successfully' });
    } catch (error) {
      console.error('Error deleting code request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const getAllCodeRequests = async (req, res) => {
    try {
      const codeRequests = await CodeRequest.find();
  
      // Fetch information about the staff members and requesters
      const populatedCodeRequests = await Promise.all(codeRequests.map(async (codeRequest) => {
        const staffInfo = await User.findById(codeRequest.staff);
        const requesterInfo = await User.findById(codeRequest.requester);
  
        return {
          ...codeRequest.toObject(),
          staffInfo: staffInfo ? { id: staffInfo._id, name: staffInfo.fullName, position: staffInfo.position, email: staffInfo.email } : null,
          requesterInfo: requesterInfo ? { id: requesterInfo._id, name: requesterInfo.fullName, email: requesterInfo.email } : null
        };
      }));
  
      res.status(200).json(populatedCodeRequests);
    } catch (error) {
      console.error('Error fetching code requests:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  // single code for requester
  const getSingleCodeRequests = async (req, res) => {
    try {
      // Retrieve the logged-in requester's ID from the request object
      const { requesterId } = req.params; // Adjust this based on your authentication setup
  
      // Fetch code requests related to the single requester
      const codeRequests = await CodeRequest.find({ requester: requesterId });
  
      // Fetch information about the staff members and requesters for the filtered code requests
      const populatedCodeRequests = await Promise.all(codeRequests.map(async (codeRequest) => {
        const staffInfo = await User.findById(codeRequest.staff);
        const requesterInfo = await User.findById(codeRequest.requester);
  
        return {
          ...codeRequest.toObject(),
          staffInfo: staffInfo ? { id: staffInfo._id, name: staffInfo.fullName, position: staffInfo.position, email: staffInfo.email } : null,
          requesterInfo: requesterInfo ? { id: requesterInfo._id, name: requesterInfo.fullName, email: requesterInfo.email } : null
        };
      }));
  
      res.status(200).json(populatedCodeRequests);
    } catch (error) {
      console.error('Error fetching code requests:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  

export {
  createCodeRequest,
  confirmCodeRequest, 
  deleteCodeRequest, 
  getAllCodeRequests , 
  getSingleCodeRequests };
