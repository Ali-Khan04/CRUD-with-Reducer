import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: [30, "Title Exceeds its limit"],
      minlength: [3, "Title Too Short"],
      required: [true, "Title is Recuired"],
    },
    goal: {
      type: String,
      maxlength: [300, "Description exceeds its limit"],
      required: [true, "Description is Required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CrudUser",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);
const todoArray = mongoose.model("TodoArray", todoSchema);
export default todoArray;
