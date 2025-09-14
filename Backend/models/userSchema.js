import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [30, "Name exceeds its limit"],
    minlength: [3, "Name too short"],
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password too short"],
    required: [true, "Password is Required"],
  },
});
const CrudUser = mongoose.model("CrudUser", userSchema);
export default CrudUser;
