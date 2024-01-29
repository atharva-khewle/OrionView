//does everything related to lpgin in and authentication 
import {UserModel} from "../models/Users.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { secretTkn } from "../auth_info.js";


const router = express.Router();

router.post("/register", async(req , res)=>{
//callnack function
//req= get data
//res= send data


//registering user
//we get 
const {username, password}= req.body;

const user = await UserModel.findOne({username});

if(user){
    return res.json({message: "User already exists!!!"})
}

const hashedpass = await bcrypt.hash(password,10);

const newUserquery = new UserModel({
    username,
    password: hashedpass
})

//saved in db
await newUserquery.save();

//gtting object savved in db
const userinfo = await UserModel.findOne({username});

////////////////////// userinfo._id gives us id with what the object si saved
const token = jwt.sign({id : userinfo._id} , secretTkn())


//should only  give 1 response
res.json({
    message:"Registerd successfully :)",
    token, 
    userID: userinfo._id
})


})

router.post("/login",async(req,res)=>{
        const {username,password}=req.body;

        const userinfo = await UserModel.findOne({username});
    
        if(!userinfo){
            return res.json({message: "user does not exist :("});
        }

        const ispassvalid = await bcrypt.compare(password,userinfo.password);

        if(!ispassvalid){
            return res.json({message:"Incorrect Password or username :( "})
        }

        const token = jwt.sign({id : userinfo._id} , secretTkn())

        res.json({
            message:"Logged In successfully :)",
            token,
             userID: userinfo._id
            })


        
})
 


//since there are many routers inbuilt
export {router as UserRouter};