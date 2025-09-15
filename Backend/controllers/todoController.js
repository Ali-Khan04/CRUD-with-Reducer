import todoArray from "../models/todoSchema.js";

export const postTodos = async (req, res, next) => {
  const { title, goal } = req.body;
  if (!title || !goal) {
    return res
      .status(400)
      .json({ success: false, message: "Required Fields Missing" });
  }
  if (typeof title !== "string" || typeof goal !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Fields Format" });
  }
};
try {
  const newTodo = new todoArray({
    title,
    goal,
  });
  const savedTodo = await newTodo.save();
  res.status(201).json({
    success: true,
    message: "Todo Created",
    todo: {
      todoId: savedTodo.id,
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
