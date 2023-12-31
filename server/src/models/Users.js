// this tells MDB how our susers collections look like

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String , required: true , unique: true},
    password: {type: String , required: true}
});

//names userschema and stores it
export const UserModel = mongoose.model("users", UserSchema);