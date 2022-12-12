import mongoose from "mongoose";

/**
 * 1.- Schema (molde) 
 * 2.- Nombre (String)
 */

const movieSchema= new mongoose.Schema({
    title:String,
    description:String,
    image:String,
    dateRelease:Date,
    
})

export default mongoose.model("Movie",movieSchema)