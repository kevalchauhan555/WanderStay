const { types } = require("joi");
const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  geometry:{
    type:{
      type:String,//Don't do '{location:{type:String}}'
      enum:['Point'], //location type must be a 'Point'
      //required:true,
    },
    coordinates:{
      type:[Number],
      //required:true
    },
  },
  category: {
    type: String,
    enum: ['Rooms', 'Iconic Cities', 'Mountains', 'Castles', 'Amazing Pools', 'Camping', 'Farms','Dome'],
    required: true,
  },
});

listingSchema.post("findOneAndDelete",async (listing) =>{
  if(listing){
    await Review.deleteMany({_id : {$in:listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema); 
module.exports = Listing; 