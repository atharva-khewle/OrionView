import jwt from "jsonwebtoken";
import { secretTkn } from "../auth_info.js";
import { UserModel } from "../models/Users.js";
import axios from "axios";


export const verifyToken = (req, res, next) => {
    // console.log("verifytokenentered  ")
    // console.log("h ",req.headers)
    const token = req.headers.authorization;
    // console.log("token is ",token)
  
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

  
    try {
      const decoded = jwt.verify(token, secretTkn());
      req.body.userId = decoded.id;
    //   console.log(decoded.id)
    //   console.log("jo")

    //   console.log(decoded.id)
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: "Invalid token." });
    }
  };





export  const addOrUpdateMovieToListByUserId = async (userId, movieData) => {
    try {
      // Find the user by their userId (_id)
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return { success: false, message: "User not found." };
      }
  
    // Ensure movieData.title is a string
    const movieTitleAsString = String(movieData.title);

    // Check if the movie/series already exists in the user's list
    const existingItemIndex = user.list.findIndex(item => String(item.title) === movieTitleAsString);
  
    if (movieData.status === "remove") {
        // If status is "None", remove the movie/series from the list if it exists
        if (existingItemIndex !== -1) {
            user.list.splice(existingItemIndex, 1); // Remove the item from the list
        }
    } else {
        // If the movie/series exists, update its data; otherwise, add it to the list
        if (existingItemIndex !== -1) {
            user.list[existingItemIndex].status = movieData.status;
            user.list[existingItemIndex].episodesWatched = movieData.episodesWatched;
            user.list[existingItemIndex].isFavorite = movieData.isFavorite;
        } else {
            user.list.push(movieData); // Add the movie/series to the list
        }
    }
  
      // Save the changes to the user's document
      await user.save();
  
      return { success: true, message: "Movie/series added/updated successfully." };
    } catch (error) {
      console.error("Error adding/updating movie/series to list:", error);
      throw error; // Throw the error for handling elsewhere
    }
  };

export const updateUserImage = async (userId, imgBit) => {
  try {
    // Find the user by their userId (_id)
    const user = await UserModel.findById(userId);

    if (!user) {
      return { success: false, message: "User not found." };
    }

    // Update the user's image with the new imgBit
    user.image = imgBit;

    // Save the changes to the user document
    await user.save();

    console.log('updated image')

    return { success: true, message: "User image updated successfully." };
  } catch (error) {
    console.error("Error updating user image:", error);
    throw error; // Throw the error for handling elsewhere
  }
};

  
export  async function getIMDbIdFromTMDBId(id, isMovie) {
    try {
        let response;
        if (isMovie) {
            const url = `http://api.themoviedb.org/3/movie/${encodeURIComponent(id)}/external_ids?api_key=fb65aa975bbfceef38074d901769c896`;
            response = await axios.get(url);
        } else {
            const url = `http://api.themoviedb.org/3/tv/${encodeURIComponent(id)}/external_ids?api_key=fb65aa975bbfceef38074d901769c896`;
            response = await axios.get(url);
        }
        
        const imdbId = response.data.imdb_id;
        if (imdbId) {
            return imdbId;
        } else {
            throw new Error('IMDb ID not found for the given TMDB ID');
        }
    } catch (error) {
        console.error('Error occurred:', error.response ? error.response.data : error.message);
        throw new Error('Error fetching IMDb ID');
    }
}

//   // Usage example: Add or update movie/series data in the user's list by userId
//   const userId = "example_userId"; // Replace with the actual userId (_id)
//   const movieData = {
//     title: "Example Movie",
//     type: "movie",
//     status: "watching",
//     episodesWatched: 5,
//     isFavorite: true
//   };
  
//   // Call the function to add or update movie/series data in the user's list by userId
//   addOrUpdateMovieToListByUserId(userId, movieData);
  