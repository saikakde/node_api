import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Invlid Email or Password",
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(404).json({
            success: false,
            message: "Invlid Email or Password",
        })
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200)

}
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Already Exist",
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered successfully", 201);
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
        user,
    })
}