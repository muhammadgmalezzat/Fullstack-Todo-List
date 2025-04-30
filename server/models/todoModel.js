import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    dueDate: {
        type: Date
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
