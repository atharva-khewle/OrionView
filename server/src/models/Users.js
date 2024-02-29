// this tells MDB how our susers collections look like
import mongoose from "mongoose";

// ListItem Schema (for User's list)
const listItemSchema = new mongoose.Schema({
    //save imdb id in title
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ['movie', 'series'] },
    status: { type: String, required: true, enum: ['watching', 'completed','wishlist','none'] },
    episodesWatched: { 
        type: Number, 
        required: function() { return this.type === 'series'; }
    },
    isFavorite: { type: Boolean, default: false } 
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    list: [listItemSchema],
    image: { type: String,required:false},
});

// Create the model from the schema and export it
export const UserModel = mongoose.model("users", userSchema);

