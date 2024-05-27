import mongoose from 'mongoose';

const PositionSchema = new mongoose.Schema({
    positionName: {
        type: String,
        required: true
    },

}, {
    timestamps: true 
});

const Positions = mongoose.model('Positions', PositionSchema);

export default Positions;
