import mongoose from "mongoose";

const rateSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description:String,
    rate:Number,
})

export default mongoose.model("Rate",rateSchema)