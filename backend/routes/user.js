let express = require('express');
let router = express.Router();

// User modèle
//let userSchema = require("../models/User");
const account = require("./account/lib");

// LOGIN
router.route("/login").post( (req, res) => {
    console.log("LOGIN");
    account.login(req, res);
});

//SIGNUP
router.route("/signup").post( (req, res) => {
    console.log("SIGNUP");
    account.signup(req, res);
});

module.exports = router;