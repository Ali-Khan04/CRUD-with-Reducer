import todoArray from "../models/todoSchema.js";

export const getTodos = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const todos = await todoArray.find({ user: userId });

    const formattedTodos = todos.map((todo) => ({
      id: todo._id.toString(),
      title: todo.title,
      goal: todo.goal,
    }));

    res.status(200).json({
      success: true,
      todos: formattedTodos,
    });
  } catch (error) {
    console.error("Get todos error:", error);
    next(error);
  }
};
