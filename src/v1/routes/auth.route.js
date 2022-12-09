// Dependencies
const express = require("express");
const getRequestData = require("../middlewares/getRequestData.middleware");
const { userRegister } = require("../controllers/auth");




const auth = express.Router();



// User registration routes
auth.post("register", getRequestData, userRegister);