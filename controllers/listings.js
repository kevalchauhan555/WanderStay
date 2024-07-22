const Listing = require("../models/listing");
const Reserve = require("../models/reserve");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//index rout
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listing/index.ejs", { allListings });
};

//New Rout
module.exports.renderNewForm = (req, res) => {
  res.render("listing/new.ejs");
};

//Show Rout
module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  let reserve = await Reserve.findOne({ listing: id });

  let isReserved;
  if (reserve == null) {
    isReserved = false;
  } else if (reserve != null && reserve.checkout.getTime() >= Date.now()) {
    isReserved = true;
  }

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for dose not exist");
    res.redirect("/listing");
  }
  res.render("listing/show.ejs", { listing, isReserved,reserve});
};


//Create Rout
module.exports.createListing = async (req, res) => {
  console.log(Date.now(), req.body);
  try {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

    let url = req.file.path;
    let filename = req.file.filename;

    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };
    newlisting.geometry = response.body.features[0].geometry;

    let savedListing = await newlisting.save();
    console.log(savedListing);
    req.flash("success", "Your property has been listed on WanderStay!");
    res.redirect("/listings");
  } catch (error) {
    console.log(error);
  }
};

//Edit & Update Rout
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for dose not exist");
    res.redirect("/listing");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listing/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

//Delete Rout
module.exports.destroy = async (req, res) => {
  let { id } = req.params;

  let reserve = await Reserve.findOne({ listing: id }).populate("reserveby");
  console.log(reserve);
  if(reserve == null){
    await Listing.findByIdAndDelete(id);
    req.flash("success", "New Listing Deleted!");
    res.redirect("/listings");
  }
  else{
    req.flash("error", `Already booked by ${reserve.reserveby.username}, You can remove your property after ${reserve.checkout.toString().split(" ").slice(1,4).join(" -")}`);
    res.redirect(`/listings/${id}`);
  }
  
};
