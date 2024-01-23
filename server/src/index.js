//when u start after long time follow this
/*
go to mongodb atlas and whitelist ip address
start server and client
 */


import * as Authinfo from "./auth_info.js";
import express from "express";
//connect frontend anddbacknd
import cors from "cors";
//query and communication to online mongodb atlas 
import mongoose from 'mongoose';

import { UserRouter } from "./routes/usersjs.js"
import { xkcdRouter } from "./routes/xkcd.js";
import { popularMoviesRouter } from "./routes/popularmovies.js";
import { popularSeriesRouter } from "./routes/poopularseries.js";
import { topRatedMoviesRouter } from "./routes/topratedmovies.js";
import { searchQueryRouter } from "./routes/searchqurey.js";

const app = express()

//convert fronted tp nackend
app.use(express.json());
//api, very imp
app.use(cors());

//data in /auth
app.use("/auth",UserRouter);

app.use("/popularmovies",popularMoviesRouter)
app.use("/topratedmovies",topRatedMoviesRouter)
app.use("/popularseries",popularSeriesRouter)
app.use("/search",searchQueryRouter)

app.use("/xkcd",xkcdRouter);

mongoose.connect(`mongodb+srv://avk:${Authinfo.mongoatlaspassfun()}@orionviewdb.ew9wgel.mongodb.net/OrionView?retryWrites=true&w=majority`) 
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.listen(3001, ()=>{console.log("Server Started at 3001. lets goooooooooooooooooo")});
