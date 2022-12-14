// Dependencies
const express = require("express");
const AuthRoute = require("./routes/auth.route.js");



// Instanciate
const router = express.Router();


// Routes
router.use("/auth", AuthRoute);



module.exports = router;