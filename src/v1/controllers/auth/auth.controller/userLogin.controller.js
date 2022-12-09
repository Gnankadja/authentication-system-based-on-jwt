// Dependencies
const { getOneUserWithTelephone } = require("../../../services/user.service");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../../helpers/auth.helper");

const verifyLoginData = (req) => new Promise(async (resolve, reject) => {
    const data = req.data;

    if (!data.telephone) reject({ status: 400, msg: "Unavailable telephone" });

    if (!data.password) reject({ status: 400, msg: "Unavailable password" });

    try {
        // Check if user exist in database
        const user = await getOneUserWithTelephone(String(data.telephone));
        if (user == null) reject({ status: 400, msg: "Invalid credentials" });
        resolve({ data: data, user: user });
    }
    catch (error) { reject({ status: 500, msg: "Server error; Please retry" }) }
});


const userLogin = async (req, res, next) => {
    try {
        // Verify user login data
        const { data, user } = await verifyLoginData(req);

        // Verify if password is valid
        if (await bcrypt.compare(data.password, user.user_password)) {

            // Prepare data to store in jwt payload
            const payload = {
                userReference: user.user_reference,
                userEmail: user.user_email,
                userTelephone: user.user_telephone,
                userFirstName: user.user_first_name,
                userLastName: user.user_last_name
            }
            const token = generateToken(payload);

            // Prepare data to return user
            const userData = {
                telephone: user.user_telephone,
                firstName: user.user_first_name,
                lastName: user.user_last_name
            }


            res
                .status(200)
                .json({
                    status: 200,
                    message: "Login succeful🤞",
                    token: token,
                    userData: userData
                });
        }
        else return next({
            status: 400,
            message: "Invalid credentials"
        });

    }
    catch (error) { console.log(error); next({ status: error.status, message: error.msg }) }
}

module.exports = userLogin