// Dependencies
const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const v1 = require("./src/v1/index");
const DatabaseService = require("./src/v1/services/database.service.js");  //Try connect to database to check if service is started succeful



// Instantiation & Initialization
dotenv.config();
const app = express();
const port = process.env.LISTEN_PORT || 3000;
const corsOption = {
    origin: JSON.parse(process.env.ALLOW_LIST)
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, }));
app.use(cors(corsOption));


// Manage Versionning
app.use("/v1", v1);


/* Error handler middleware */
app.use((err, req, res, next) => {
    console.log(err);
    const statusCode = err.status || 500;
    const message = err.message || "Une erreur interne s'est produit; Veuillez réssayer plus tard";
    res.status(statusCode).json({ status: statusCode, message: message });
    return;
});


// Running Server
app.listen(port, '127.0.0.1', () => {
    console.log(`Application listening at http://127.0.0.1:${port}`)
});
