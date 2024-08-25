import { model, Schema, Types } from "mongoose";
import bcrypt from 'bcrypt'

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

userSchema.pre('init', function () {
    this.password = bcrypt.hashSync(this.password, 10)
})
// userSchema.pre(/^findOne/, function () {
//     if (this._update) this._update.password = bcrypt.hashSync(this._update.password, 10)
// })

const User = model('User', userSchema);

export default User