import express from 'express';
import { addTodo, getTodos, updateTodo, deleteTodo, changeTodoStatus } from '../controllers/todoControllers.js';
import  authUser  from '../middlewares/authMiddleware.js';
const todoRouter = express.Router();


//todo routes
todoRouter.post("/addTodo",authUser, addTodo); //auth
todoRouter.get("/getTodos",authUser, getTodos);//auth
todoRouter.post("/updateTodo",authUser, updateTodo);//auth
todoRouter.delete("/deleteTodo",authUser, deleteTodo);//auth
todoRouter.post("/changeTodoStatus", authUser, changeTodoStatus);//auth

export default todoRouter;