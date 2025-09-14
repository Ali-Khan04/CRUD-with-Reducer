import mongoose from "mongoose";

const objSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [10, "Name exceeds limit"],
      minlegth: [3, "Name has to be longer"],
      default: "",
    },
    bio: {
      type: String,
      maxlength: [250, "Bio exceeds its limit"],
      default: "",
    },
    location: {
      type: String,
      maxlength: [100, "Location exceeds its limit"],
      minlength: [5, "Location too short"],
    },
  },
  { timestamps: true }
);
const Obj = mongoose.model("Obj", objSchema);
export default Obj;
