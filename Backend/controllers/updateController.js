import mongoose from "mongoose";
import todoArray from "../models/todoSchema.js";
import CrudUser from "../models/userSchema.js";

export const updateTodo = async (req, res, next) => {
  const { title, goal } = req.body;
  const { todoId } = req.params;
  const userId = req.user.id;
  if (!title || !goal || !todoId || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Required Fields Missing" });
  }
  if (typeof title !== "string" || typeof goal !== "string") {
    return res.status(400).json({ success: false, message: "Invalid Format" });
  }
  if (
    !mongoose.Types.ObjectId.isValid(todoId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid id Format" });
  }
  const validUser = await CrudUser.findById(userId);
  if (!validUser) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  try {
    const updateData = await todoArray.findOneAndUpdate(
      {
        user: userId,
        _id: todoId,
      },
      { goal, title },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "User Todo Updated!",
      updatedTodo: {
        user: validUser.id,
        todo: updateData.id,
        title: updateData.title,
        goal: updateData.goal,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ success: false, message: "DB Validation Failed" });
    }
    next(error);
  }
};
