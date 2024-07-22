const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    creayedAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

let Review = mongoose.model("Review",reviewSchema);
module.exports = Review;   