import { Schema, model } from 'mongoose';

const memoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    icon: {
        type: String,
        default: "📝"
    },
    title: {
        type: String,
        default: "No Title"
    },
    description: {
        type: String,
        default: "Input your memo..."
    },
    position: {
        type: Number,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    favoritePosition: {
        type: Number,
        default: 0,
    }
});

const Memo = model('Memo', memoSchema);

export default Memo;