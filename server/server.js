import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import authRouter from './routes/authRoutes.js';

//app config
const app = express();
const port = 3000;
await connectDB();
//middlewares
app.use(express.json());
app.use(cors());

//api endpoits
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/auth", authRouter);


app.get("/", (req, res, next) => {
    res.send("api work");
});

app.listen(port, () => {
    console.log("server start at", port);
})