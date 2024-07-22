const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Reserve = require("../models/reserve");
const { reserveSchema } = require("../schema.js");
const { validateReserve, isLoggedIn } = require("../middleware.js");
const nodemailer = require("nodemailer");
const reserveController = require("../controllers/reserve.js");

//Render Booking Form
router
  .route("/listings/:id/reserve")
  .get(isLoggedIn, wrapAsync(reserveController.renderReserveForm))
  .post(
    //Add Reserve to the DataBase
    isLoggedIn,
    validateReserve,
    wrapAsync(reserveController.addReserve)
  );

//Show all Reservation done by user
router.get(
  "/user/reserveDetails",
  isLoggedIn,
  wrapAsync(reserveController.allReserve)
);

//destroy Reserve
router.delete(
  "/user/:id/destroy",
  isLoggedIn,
  wrapAsync(reserveController.destroy)
);

module.exports = router;
