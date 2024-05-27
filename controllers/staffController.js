// staffController.js
import Staff from "../models/Staff.js";

const registerStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json({ message: "Staff data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateStaff = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedStaff) {
        return res.status(404).json({ message: "Staff not found" });
      }
  
      res.status(200).json({ message: "Staff data updated successfully", staff: updatedStaff });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  const deleteStaff = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedStaff = await Staff.findByIdAndDelete(id);
      if (!deletedStaff) {
        return res.status(404).json({ message: "Staff not found" });
      }
  
      res.status(200).json({ message: "Staff deleted successfully", staff: deletedStaff });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getAllStaff = async (req, res) => {
    try {
      const allStaff = await Staff.find();
      res.status(200).json(allStaff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getSingleStaff = async (req, res) => {
    try {
      const { id } = req.params;
      const singleStaff = await Staff.findById(id);
      res.status(200).json(singleStaff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export default { registerStaff, updateStaff, deleteStaff , getAllStaff, getSingleStaff };
