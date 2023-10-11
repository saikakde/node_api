import express from "express";
import { getAllUsers, getUserDetails, register, special } from "../controllers/user.js";

const router = express.Router();

// if this block is placed after the block that is just below then it gives error
router.get("/userid/special", special)

// router.post("/userid",getUserDetails) //using json

// router.get("/userid",getUserDetails) //using query params

router.get("/userid/:id",getUserDetails) //using params

router.get("/all", getAllUsers)


router.post("/new", register)

export default router;