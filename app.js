import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from './routes/task.js'
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/.env"
})

// using middlewares
app.use(express.json());
app.use(cookieParser());

// using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

// cross origin resource sharing
app.use(cors({
    // origin:[process.env.FRONTEND_URL],
    origin:'*',
    methods:["GET","POST","PUT","DELETE"],
    // credentials:true
}))

// var corsOptions = {
//     origin: ["http://localhost:5173"],
//     optionsSuccessStatus: 200 // For legacy browser support
//     }
    
//     app.use(cors(corsOptions));
  
//   app.all('*', function(req, res, next) {
//     const origin = cors.origin.includes(req.header('origin').toLowerCase()) ? req.headers.origin : cors.default;
//     res.header("Access-Control-Allow-Origin", origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


app.get('/',(req,res)=>{
    res.send("Nice work");
})

app.use(errorMiddleware)


