// this tells MDB how our susers collections look like
import mongoose from "mongoose";

// Define a schema for individual list items (movies or series)
const listItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ['movie', 'series'] },
    status: { type: String, required: true, enum: ['watched', 'not watched', 'watching'] },
    episodesWatched: { 
        type: Number, 
        required: function() { return this.type === 'series'; } // Required only for series
    }
});

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    list: [listItemSchema],
    image: {
        type: String, // URL or path to the image
        required: false // Optional field
    }
});

// Create the model from the schema and export it
export const UserModel = mongoose.model("users", userSchema);

