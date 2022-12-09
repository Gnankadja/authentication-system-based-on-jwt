const { validate } = require("deep-email-validator");

// Return current data and hours in unix timestamp format
function timeStamp() { return Math.floor(Date.now() / 1000); }

// Convert a timestamp date to human format
const humanDateFormat = timeStamp => {
    return new Date(timeStamp * 1000).toLocaleString();
}

// Check if one key is  an object
function keyExists(key, object) { return key in object; }

// Check if an object is object
const isObject = (object) => (typeof (object) === 'object' && !Array.isArray(object) && object !== null);

// Check Email
const isValidEmail = async (email) => {
    const res = await validate({
        email: email,
        validateTypo: false,
        validateSMTP: false
    });
    return res.valid;
}

// Check Password
const isValidPasswordFormat = password => {
    if (password.length > 5) return true;
    return false;
};

const isTextOnly = (text) => (/^[a-zA-ZéèêïÏ]*$/).test(text);

const isTextOnlyAndSpace = (text) => (/^[a-zA-ZéèêïÏ_-\s]*$/).test(text);


module.exports = {
    timeStamp,
    humanDateFormat,
    keyExists,
    isObject,
    isValidEmail,
    isValidPasswordFormat,
    isTextOnly,
    isTextOnlyAndSpace
}