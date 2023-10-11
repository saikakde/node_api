import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({});
    // console.log(req.query);
    // console.log(req.query.key);

    const keyword = req.query.keyword;
    console.log(keyword);

    res.json({
        success: true,
        users,
    })
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    res.status(201).cookie("key", "val").json({
        success: true,
        message: 'registered successfully',
    })
}

export const special = (req, res) => {
    res.json({
        success: true,
        message: "just joking",
    })
}

export const getUserDetails = async(req,res)=>{
    // below is the dynamic route always try to keep it at the end
    // router.get("/userid/:id", async (req, res) => {
        // const {id}=req.body;
        // const {id}=req.query;
        const { id } = req.params;
    
        const user = await User.findById(id);
    
        res.json({
            success: true,
            user,
        })
    }