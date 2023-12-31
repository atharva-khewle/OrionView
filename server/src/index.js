import * as Authinfo from "./auth_info.js";
import express from "express";
//connect frontend anddbacknd
import cors from "cors";
//query and communication to online mongodb atlas 
import mongoose from 'mongoose';

import { UserRouter } from "./routes/usersjs.js"

const app = express()

//convert fronted tp nackend
app.use(express.json());
//api, very imp
app.use(cors());

//data in /auth
app.use("/auth",UserRouter);

mongoose.connect(`mongodb+srv://avk:${Authinfo.mongoatlaspassfun()}@orionviewdb.ew9wgel.mongodb.net/OrionView?retryWrites=true&w=majority`)

app.listen(3001, ()=>{console.log("Server Started lets goooooooooooooooooo")});
