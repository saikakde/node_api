import express, { urlencoded } from "express";
import mongoose from "mongoose";


const app = express();

// app.use(urlencoded());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017",{
    dbName:'backend2'
}).then(()=>console.log('db connected')).catch((e)=>console.log(e));

const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const User = mongoose.model("User",schema);

app.get('/',(req,res)=>{
    res.send("Nice work");
})
app.listen(4000,()=>{

    console.log("server is working")}
)

// if this block is placed after the block that is just below then it gives error
app.get("/userid/special",(req,res)=>{
    res.json({
        success:true,
        message:"just joking",
    })
})

// app.get("/userid",async(req,res)=>{

    // below is the dynamic route always try to keep it at the end
    app.get("/userid/:id",async(req,res)=>{
        // const {id}=req.body;
        // const {id}=req.query;
        const {id} = req.params;
        
        const user = await User.findById(id);
        
        res.json({
            success:true,
            users,
        })
    })
    

app.get("/users/all",async(req,res)=>{
    const users = await User.find({}); 
    console.log(req.query);
    console.log(req.query.key);
    res.json({
        success:true,
        users,
    })
})

app.get("/users/new",(req,res)=>{
    console.log("hello");
    res.redirect("/")
})
app.post("/users/new",async(req,res)=>{
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    }); 
    res.status(201).cookie("key","val").json({
        success:true,
        message:'registered successfully',
    })
})