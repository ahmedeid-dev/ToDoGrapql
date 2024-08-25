import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        trim: true,
        lowercase: true,
    },
    notes: [{
        type: Types.ObjectId,
        ref: 'Note'
    }],
});

const User = model('User', userSchema);

export default User