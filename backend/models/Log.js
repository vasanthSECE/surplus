import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Success', 'Verified', 'In Progress', 'Failed', 'Warning'],
    }
}, { timestamps: true });

export default mongoose.model('Log', logSchema);
