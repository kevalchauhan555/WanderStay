const Listing = require("../models/listing");


module.exports.rooms = async (req, res) => {
    const listings = await Listing.find({ category: "Rooms" });
    res.render("filter/filter.ejs", { listings });
};

module.exports.iconic = async (req, res) => {
    const listings = await Listing.find({ category: "Iconic Cities" });
    res.render("filter/filter.ejs", { listings });
};

module.exports.mount = async (req, res) => {
    const listings = await Listing.find({ category: "Mountains" });
    res.render("filter/filter.ejs", { listings });
};

module.exports.castle = async (req, res) => {
    const listings = await Listing.find({ category: "Castles" });
    res.render("filter/filter.ejs", { listings });
};

module.exports.pools = async (req, res) => {
    const listings = await Listing.find({ category: "Amazing Pools" });
    res.render("filter/filter.ejs", { listings });
};

module.exports.camp = async (req, res) => {
    const listings = await Listing.find({ category: "Camping" });
    res.render("filter/filter.ejs", { listings });
};

module.exports.farms = async (req, res) => {
    const listings = await Listing.find({ category: "Farms" });
    res.render("filter/filter.ejs", { listings });
};

module.exports.dome =async (req, res) => {
    const listings = await Listing.find({ category: "Dome" });
    res.render("filter/filter.ejs", { listings });
};