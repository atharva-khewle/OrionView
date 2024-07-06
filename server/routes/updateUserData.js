
import {UserModel} from "../models/Users.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { addOrUpdateMovieToListByUserId, verifyToken } from "./functions.js";


const router = express.Router();

router.post('/',verifyToken ,async (req, res) => {
    const { userId, movieData } = req.body; 

    try {
        const result = await addOrUpdateMovieToListByUserId(userId, movieData);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error in /updateMovieList route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/',async(req,res)=>{
res.json({
    "aaa":"done"
})
})


export {router as UserDataUpdateRouter};



