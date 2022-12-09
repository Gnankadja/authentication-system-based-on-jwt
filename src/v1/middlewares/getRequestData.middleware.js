const { isObject } = require("../utils/basic.util");

const getRequestData = (req, res, next) => {
    if (req.body.data && isObject(req.body.data)) {
        req.data = req.body.data;
        next();
    }
    else next({ status: 400, message: "Invalid data object" });
}

module.exports = getRequestData;