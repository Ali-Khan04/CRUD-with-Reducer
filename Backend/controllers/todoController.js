import mongoose from "mongoose";
import todoArray from "../models/todoSchema.js";
import CrudUser from "../models/userSchema.js";

export const postTodos = async (req, res, next) => {
  const { title, goal } = req.body;
  const userId = req.user.id;
  if (!title || !goal || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Required Fields Missing" });
  }
  if (typeof title !== "string" || typeof goal !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Fields Format" });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid User id" });
  }
  const validUser = await CrudUser.findById(userId);
  if (!validUser) {
    return res.status(400).json({ success: false, message: "No user Found" });
  }
  try {
    const newTodo = new todoArray({
      title,
      goal,
      user: userId,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json({
      success: true,
      message: "Todo Created",
      todo: {
        user: validUser.userId,
        id: savedTodo._id.toString(),
        title: savedTodo.title,
        goal: savedTodo.goal,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error(error);
      return res
        .status(400)
        .json({ success: false, message: "DB Validation Failed" });
    }
    next(error);
    console.error(error);
  }
};
