// Initialize express router
const express = require('express');
const router = express.Router();

//bcrypt for password hashing
const bcrypt = require("bcrypt");


/* -------------- Sign-up Routes ---------------- */
//GET


router.get("/sign-up", async (req, res) => {
  res.render("auth/sign-up.ejs");
});

//POST
router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });

  // Check if the username is already taken
  if (userInDatabase) {
    return res.send("Username already taken.");
  }

 // Check if the password and confirm password match
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  // Create the user
  const user = await User.create(req.body);
  res.send(`Thanks for signing up ${user.username}`);

}); 


/* -------------- Sign-in Routes ---------------- */
//GET

router.get("/sign-in", async (req, res) => {
  res.render("auth/sign-in.ejs");
  }
);
//POST
router.post("/sign-in", async (req, res) => {
  // Check if the user exists
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

// Check if the password is correct
const validPassword = bcrypt.compareSync(
  req.body.password,
  userInDatabase.password
);
if (!validPassword) {
  return res.send("Login failed. Please try again.");
}

req.session.user = {
  username: userInDatabase.username,
  _id: userInDatabase._id
};

res.redirect("/");
});


/* -------------- Sign-out Routes ---------------- */
//GET
router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


//call to user model
const User = require("../models/user.js");

//module export
module.exports = router;