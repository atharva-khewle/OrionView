//when u start after long time follow this
/*
go to mongodb atlas and whitelist ip address
start server and client
 */

///////////////////// //////
/*
bhaiiiiiiiiiiiii
wasted 1hr
headers can only go in post not in get
next time just send tokens inside body
its less secure but i am aslo not doing some big project
*/
import * as Authinfo from "./auth_info.js";
import express, { json, urlencoded } from "express";
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
import { getdatabyID } from "./routes/getdatabyTVDBid.js";
import { getSimilarsByID } from "./routes/getSimilarsbyID.js";
import { UserDataUpdateRouter } from "./routes/updateUserData.js";
import { TMBDtoIMDBRouter } from "./routes/getImdbIDbyTMDBID.js";
import { SavedMovieDataofIserIDRouter } from "./routes/getSavedMovieDataofUserbyID.js";
import { getUsershowsListRouter } from "./routes/getUserShowsList.js";
import { getUserInfoRouter } from "./routes/getUserInfoby.js";
import { updateUserImage } from "./routes/functions.js";
import { updateUserImageRouter } from "./routes/uploadimage.js";
import { config } from "dotenv";

const app = express()

//convert fronted tp nackend
app.use(express.json());
//api, very imp
app.use(cors());
//run config to access .env
config();


app.use(json({ limit: '5000mb',extended:true }));
app.use(urlencoded({ limit: '500mb', extended: true }));

//data in /auth
app.use("/auth",UserRouter);

app.use("/popularmovies",popularMoviesRouter)
app.use("/topratedmovies",topRatedMoviesRouter)
app.use("/popularseries",popularSeriesRouter)
app.use("/getdatabyid",getdatabyID)
app.use("/getsimilarsbyid",getSimilarsByID)
app.use("/updateList",UserDataUpdateRouter)
app.use("/getimdbidbytmdbid",TMBDtoIMDBRouter)
app.use("/search",searchQueryRouter)
app.use("/getImdbIdbyTmdbId",TMBDtoIMDBRouter)
app.use("/getsavedmovieidbyuserid",SavedMovieDataofIserIDRouter)
app.use("/getUserShowsList",getUsershowsListRouter)
app.use("/getUserInfoRouter",getUserInfoRouter)
app.use("/updateUserImage",updateUserImageRouter)


app.use("/xkcd",xkcdRouter);

mongoose.connect(`mongodb+srv://avk:${process.env.MONGOATLAS_PASSWORD}@orionviewdb.ew9wgel.mongodb.net/OrionView?retryWrites=true&w=majority`) 
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.listen(3001, ()=>{console.log("Server Started at 3001. lets goooooooooooooooooo")});
