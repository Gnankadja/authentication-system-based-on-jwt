// Dependencies
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


// Initialisation
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtAlgorithm = process.env.JWT_ALGORITHM;
const jwtExpireTime = process.env.JWT_EXPIRE_TIME;
const jwtAudienceList = process.env.JWT_AUDIENCE_LSIT;
const jwtIssuer = process.env.JWT_ISSUER;

/* Function who generate login token*/
const generateToken = (payload) => {
    const token = jwt.sign(
        payload,
        jwtSecretKey,
        {
            algorithm: jwtAlgorithm,
            expiresIn: jwtExpireTime,
            issuer: jwtIssuer,
            audience: jwtAudienceList,
        }
    );
    return token;
}

module.exports = {
    generateToken
}