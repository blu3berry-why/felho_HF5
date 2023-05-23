import mongoose, { Schema, Document } from "mongoose";
import { IMovie, IMovieList } from "../interfaces/movie_interfaces";


const MovieSchema = new Schema<IMovie & Document>({
    id: Number,
    title: String,
    year: Number,
    director: String,
    actor: [String]
});

export const Movie = mongoose.model("Movies", MovieSchema, "Movies");
