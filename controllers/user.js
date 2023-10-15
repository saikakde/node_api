import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";

export const getAllUsers = async (req, res) => {
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password",400))
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid Email or Password",400))
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200)

    } catch (error) {
        next(error)
    }
}
export const register = async (req, res,next) => {
    try {
        const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User Already Exist",400))
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered successfully", 201);

    } catch (error) {
        next(error)
    }    
}


export const getMyProfile = async (req, res) => {
    const id = "myid";

    const { token } = req.cookies;
    console.log(token)

    if (!token) {
        return res.status(404).json({
            success: true,
            message: "Login first",
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id);
    res.status(200).json({
        success: true,
        user: req.user,
    })
}