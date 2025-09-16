import CrudUser from "../models/userSchema.js";
import todoArray from "../models/todoSchema.js";
import mongoose from "mongoose";

export const deleteTodo = async (req, res, next) => {
  const { todoId } = req.params;
  const userId = req.user.id;
  if (!userId || !todoId) {
    return res
      .status(400)
      .json({ success: false, message: "User or todo Id missing" });
  }
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(todoId)
  ) {
    return res.json({ success: false, message: "Invalid id format" });
  }
  const validUser = await CrudUser.findById(userId);
  if (!validUser) {
    return res.status(400).json({
      success: false,
      message: "No user found to perform this action",
    });
  }
  try {
    const deletedTodo = await todoArray.findOneAndDelete({
      _id: todoId,
      user: userId,
    });

    if (!deletedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
  } catch (error) {
    next(error);
  }
};
