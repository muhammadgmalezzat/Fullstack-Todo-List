import express from 'express';
import {getUserProfile,updateUserProfile} from '../controllers/userControllers.js';
import  authUser  from '../middlewares/authMiddleware.js';
const userRouter = express.Router();


//user routes
userRouter.get("/getUserProfile",authUser, getUserProfile);//auth
userRouter.post("/updateUserProfile", authUser, updateUserProfile);//auth


export default userRouter;