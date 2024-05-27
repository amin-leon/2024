import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Staff",
  },
  position: {
    type: String,
    required: true,
    unique: true
  },
  telephone: String,
}, {
  timestamps: true
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
