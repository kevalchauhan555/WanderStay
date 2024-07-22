const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const filterControllers = require("../controllers/filter.js");

router.get(
  "/rooms",
  wrapAsync(filterControllers.rooms)
);

router.get("/iconic", wrapAsync(filterControllers.iconic));

router.get("/mountains", wrapAsync(filterControllers.mount));

router.get("/castles", wrapAsync(filterControllers.castle));

router.get("/pools", wrapAsync(filterControllers.pools));

router.get("/camping", wrapAsync(filterControllers.camp));

router.get("/farms", wrapAsync(filterControllers.farms));

router.get("/dome", wrapAsync(filterControllers.dome));

module.exports = router; 