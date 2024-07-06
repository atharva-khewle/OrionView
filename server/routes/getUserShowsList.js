import express from 'express';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './functions.js';

const router = express.Router();

// router.post("/",async(req,res)=>{
//     res.json({a:"l"})
// })
router.post('/', verifyToken, async (req, res) => {
    try {
        // res.json({ message: "done" });
        const userId = req.body.userId;
        const user = await UserModel.findById(userId);

        if (!user) {
            // res.json({a:"b"})
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, data: user.list });
    } catch (error) {
        console.error("Error fetching movie data:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
export {router as getUsershowsListRouter};
