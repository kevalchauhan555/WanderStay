const User = require("../models/user.js");
const Listing = require("../models/listing.js");
module.exports.renderSignupForm = (req, res) => {
  res.render("user/signup.ejs");
};

//signUp
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust! You are logged in!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};

//User Properties
module.exports.renderUserProperties = async (req, res) => {
  let { id } = req.params;
  const allListings = await Listing.find({ owner: id });
  if (allListings.length == 0) {
    req.flash("error", "No Detail Found For This User");
    res.redirect("/listings");
  }
  res.render("user/myproperties.ejs", { allListings });
};
