let express = require("express");
let router = express.Router();

// User modèle
//let userSchema = require("../models/User");
const account = require("./account/lib");

// LOGIN
router.route("/login").post((req, res) => {
  console.log("LOGIN");
  account.login(req, res).catch(error => console.log("LOGIN Error : ", error));
});

//SIGNUP
router.route("/signup").post((req, res) => {
  console.log("SIGNUP");
  account
    .signup(req, res)
    .catch(error => console.log("SIGNUP Error : ", error));
});

module.exports = router;
