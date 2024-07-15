import mongoose from "mongoose";

type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  avatar?: string;
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isVerified: {
    type: Boolean,
    required: true,
    select: false,
  },
});

export const User = mongoose.model<UserType>("User", userSchema);
