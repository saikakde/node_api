import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";

export const app = express();

config({
    path:"./data/.env"
})
app.use(express.json());
app.use("/users",userRouter);

app.get('/',(req,res)=>{
    res.send("Nice work");
})
// app.get("/new", (req, res) => {
//     console.log("hello");
//     res.redirect("/")
// })


