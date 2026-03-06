import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    expiry: {
        type: Date,
        required: true,
    },
    addedBy: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('Inventory', inventorySchema);