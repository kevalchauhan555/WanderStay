const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reserve = require("./reserve");
const User = require("./user");

const paymentSchema = new mongoose.Schema({
  reserveId: {
    type: Schema.Types.ObjectId,
    ref: "Reserve",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderId: { type: String },
  paymentId: { type: String },
  amount: { type: Number },
  status: { type: String },
  method: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
