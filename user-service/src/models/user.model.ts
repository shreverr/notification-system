import { password } from "bun";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
})