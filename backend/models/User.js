import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    sub: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    picture: {
      type: String,
      trim: true
    }
  }, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;