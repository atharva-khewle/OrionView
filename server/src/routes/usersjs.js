//does everything related to lpgin in and authentication 
import {UserModel} from "../models/Users.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const router = express.Router();

router.post("/register", async(req , res)=>{
//callnack function
//req= get data
//res= send data


//registering user
//we get 
const {username, password}= req.body;

const user = await UserModel.findOne({username});

res.json(user);
})

router.post("/login")
 

//since there are many routers inbuilt
export {router as UserRouter};