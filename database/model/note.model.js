import { model, Schema, Types } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
});

const Note = model('Note', noteSchema);

export default Note