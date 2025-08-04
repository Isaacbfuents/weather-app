import mongoose from "mongoose";
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sub: {
        type: String, 
        required: true
    },
    ipAddress: {
        type: String, 
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    revoked: {
        type: Boolean,
        default: false
    }
})

refreshTokenSchema.index({ expiresAt: 1}, {expireAfterSeconds: 0});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

export default RefreshToken;