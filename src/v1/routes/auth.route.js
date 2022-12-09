// Dependencies
const express = require("express");
const getRequestData = require("../middlewares/getRequestData.middleware");
const { userRegister, userLogin } = require("../controllers/auth");




const auth = express.Router();



// User registration routes
auth.post("/register", getRequestData, userRegister);


// User login routes
auth.post("/login", getRequestData, userLogin)


module.exports = auth;