// PositionsController.js
import Positions from "../models/Positions.js";

const registerPositions = async (req, res) => {
  try {
    const { positionName } = req.body;
    // Check if positionName already exists in the database
    const existingPosition = await Positions.findOne({ positionName });
    if (existingPosition) {
      return res.status(400).json({ message: "Position already exists" });
    }
    const newPositions = new Positions({
      positionName
    });
    await newPositions.save();
    res.status(201).json({ message: "Position added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updatePositions = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPositions = await Positions.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPositions) {
      return res.status(404).json({ message: "Positions not found" });
    }

    res.status(200).json({ message: "Positions data updated successfully", Positions: updatedPositions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deletePositions = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPositions = await Positions.findByIdAndDelete(id);
    if (!deletedPositions) {
      return res.status(404).json({ message: "Positions not found" });
    }

    res.status(200).json({ message: "Positions deleted successfully", Positions: deletedPositions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllPositionss = async (req, res) => {
    try {
      const allPositionss = await Positions.find();
      res.status(200).json(allPositionss);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getSinglePositions = async (req, res) => {
    try {
      const { id } = req.params;
      const singlePositions = await Positions.findById(id);
      res.status(200).json(singlePositions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export default { registerPositions, updatePositions, deletePositions, getAllPositionss, getSinglePositions  };
