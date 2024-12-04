import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import ownerRouter from "./controller/Owner.controller.js";
import userRouter from "./controller/user.controller.js";
import regRouter from "./controller/reg.controller.js";


const app = express();
connectDB()
app.use(cors());
app.use(express.json());

dotenv.config();


app.use("/api/owner", ownerRouter);
app.use("/api/user", userRouter);
app.use("/api/reg", regRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});