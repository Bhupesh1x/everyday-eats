import mongoose from "mongoose";

type UserType = {
  _id: string;
  city?: string;
  name: string;
  email: string;
  avatar?: string;
  address?: string;
  country?: string;
  password: string;
  isVerified: boolean;
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
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

export const User = mongoose.model<UserType>("User", userSchema);
