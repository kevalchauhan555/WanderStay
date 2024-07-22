const Listing = require("../models/listing.js");
const Reserve = require("../models/reserve.js");
const Payment = require("../models/payment.js");

const { sendMail } = require("../utils/mail.js");

module.exports.renderReserveForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for dose not exist");
    res.redirect("/listing");
  }
  res.render("reserve/reserve.ejs", { listing });
};

module.exports.addReserve = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let listingPrice = listing.price;

  let checkinDate = new Date(req.body.reserve.checkin);
  let checkoutDate = new Date(req.body.reserve.checkout);
  let timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  let total = diffDays * listingPrice;

  let reserve = new Reserve(req.body.reserve);

  let email = req.user.email;
  let username = req.user.username;

  reserve.reserveby = req.user._id;
  reserve.listing = listing._id;
  reserve.total = total;
  let reserveDetail = await reserve.save();

  if (reserveDetail) {
    sendMail(email, username, reserve.checkin, reserve.checkout, total);
  }
  req.flash("success", "Booking Confirm!");
  res.render("reserve/showReserve.ejs", { reserveDetail, listing });
};

module.exports.allReserve = async (req, res) => {
  let reserveDetails = await Reserve.find({
    reserveby: req.user.id,
  })
    .populate("listing")
    .populate("payment");

  if (reserveDetails.length == 0) {
    req.flash("error", "No Detail Found For This User");
    res.redirect("/listings");
  }
  res.render("reserve/reserveDetails.ejs", { reserveDetails });
};

module.exports.destroy = async (req, res) => {
  let { id } = req.params;
  await Reserve.findByIdAndDelete(id);
  req.flash("success", "Booking Cancle Successfully!");
  res.redirect("/listings");
};
