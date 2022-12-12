import mongoose from "mongoose";

/**
 * 1.- Schema (molde) 
 * 2.- Nombre (String)
 */

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    lastName:String,
    birthday:Date,
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:String,
    address:[{
        street:String,
        zipCode:String,
        state:String
    }],
})

export default mongoose.model("User",userSchema)
