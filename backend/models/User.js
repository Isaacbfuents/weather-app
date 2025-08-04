import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    picture: {
        type: String,
        trim: true
    },
    identities: [
        {
            provider: String,
            connection: String,
            user_id: String,
            isSocial: Boolean
        }
    ],
    emailVerified: {
        type: Boolean
    },
    sub: {
        type: String,
        required: true
    }

}, { timestamps: true })


const User = mongoose.model('User', userSchema);

export default User;