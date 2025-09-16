import express from "express";
import { postTodos } from "../controllers/todoController.js";
import { updateTodo } from "../controllers/updateController.js";
import { deleteTodo } from "../controllers/deleteTodo.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/save", verifyToken, postTodos);
router.put("/update/:todoId", verifyToken, updateTodo);
router.delete("/delete/:todoId", verifyToken, deleteTodo);

export default router;
