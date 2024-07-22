const { types, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Listing = require("./listing");
const Payment = require("./payment");

const reserveSchema = new Schema({
  checkin: {
    type: Date,
    required: true,
  },
  checkout: {
    type: Date,
    required: true,
  },
  adult: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  children: {
    type: Number,
    min: 0,
    max: 4,
    required: false,
  },
  mobile: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  reserveby: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
  },
});

let Reserve = mongoose.model("Reserve", reserveSchema);
module.exports = Reserve;