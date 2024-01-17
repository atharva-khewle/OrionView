// this tells MDB how our susers collections look like
import mongoose from "mongoose";

// ListItem Schema (for User's list)
const listItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ['movie', 'series'] },
    status: { type: String, required: true, enum: ['watched', 'not watched', 'watching'] },
    episodesWatched: { 
        type: Number, 
        required: function() { return this.type === 'series'; }
    }
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    list: [listItemSchema],
    image: { type: String, required: false },
    watchHistory: [{
        title: { type: String, required: true }, // Storing just the movie title
        watchedOn: { type: Date, default: Date.now }
    }],
    watchlist: [{
        title: { type: String, required: true } // Storing just the movie title
    }],
    favorites: [{
        title: { type: String, required: true } // Storing just the movie title
    }]
});

// Create the model from the schema and export it
export const UserModel = mongoose.model("users", userSchema);

