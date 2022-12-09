// Dependencies
const bcrypt = require("bcryptjs");
const { generateUserReference } = require("../../../helpers/user.helper");
const { getOneUserWithEmail, createNewUser } = require("../../../services/user.service");
const { isValidEmail,
    isValidPasswordFormat,
    isTextOnly,
    isTextOnlyAndSpace,
    timeStamp
} = require("../../../utils/basic.util");


// Check data before start recording into database
const verifyRegistrationData = (req) => new Promise(async (resolve, reject) => {
    const data = req.data;

    if (!data.firstName && !isTextOnly(data.firstName)) reject({ status: 400, msg: "Invalid or unavailable first name" });

    if (!data.lastName && !isTextOnlyAndSpace(data.lastName)) reject({ status: 400, msg: "Invalid or unavailable last name" });

    if (!data.countryPrefix && !Number.isInteger(data.countryPrefix)) reject({ status: 400, msg: "Invalid or unavailable country prefix" });

    if (!data.telephone && !Number.isInteger(data.telephone)) reject({ status: 400, msg: "Invalid or unavailable telephone" });

    if (!data.email && isValidEmail(data.email)) reject({ status: 400, msg: "Invalid or unavailable email" });

    if (!data.password && isValidPasswordFormat(data.password)) reject({ status: 400, msg: "Invalid or unavailable password" });

    if (!data.department && isTextOnlyAndSpace(data.department)) reject({ status: 400, msg: "Invalid or unavailable department" });

    if (!data.town && isTextOnlyAndSpace(data.town)) reject({ status: 400, msg: "Invalid or unavailable town" });

    if (!data.district && isTextOnlyAndSpace(data.distric)) reject({ status: 400, msg: "Invalid or unavailable district" });

    if (!data.neighborhood && isTextOnlyAndSpace(data.neighborhood)) reject({ status: 400, msg: "Invalid or unavailable Neighborhood" });

    if (!data.typeIdDocument && isTextOnlyAndSpace(data.typeIdDocument)) reject({ status: 400, msg: "Invalid or unavailable Type ID Document" });

    if (!data.idDocumentNumber && isTextOnlyAndSpace(data.idDocumentNumber)) reject({ status: 400, msg: "Invalid or unavailable id document number" });

    if (!data.neighborhood && isTextOnlyAndSpace(data.neighborhood)) reject({ status: 400, msg: "Invalid or unavailable Neighborhood" });

    if (!data.address && isTextOnlyAndSpace(data.address)) reject({ status: 400, msg: "Invalid or unavailable address" });

    if (!data.occupation && isTextOnlyAndSpace(data.occupation)) reject({ status: 400, msg: "Invalid or unavailable occupation" });

    if (!data.birthday && isTextOnlyAndSpace(data.birthday)) reject({ status: 400, msg: "Invalid or unavailable birthday" });

    if (!data.gender && isTextOnlyAndSpace(data.gender)) reject({ status: 400, msg: "Invalid or unavailable gender" });

    // Check if user email is registred on database
    const emailIsUsed = await getOneUserWithEmail(data.email);
    if (emailIsUsed) reject({ status: 400, msg: "This email is used; Please change" });

    resolve({ ...data });


});

const userRegister = async (req, res, next) => {
    try {
        // Verify data
        const data = await verifyRegistrationData(req);

        // Generate a new user reference
        const reference = await generateUserReference();

        // Get recording date
        const createdAt = timeStamp();

        // Concat Prefix and telephone
        const telephone = Number.parseInt(data.countryPrefix + "" + data.telephone);

        // Hash password
        const password = await bcrypt.hash(data.password, 10);

        // Start user recording
        const newUser = await createNewUser({
            userReference: reference,
            userFirstName: data.firstName,
            userLastName: data.lastName,
            userAddress: data.address,
            userBirthday: data.birthday,
            userDepartment: data.department,
            userDistrict: data.district,
            userEmail: data.email,
            userGender: data.gender,
            userNeighborhood: data.neighborhood,
            userNumberIdDocument: data.idDocumentNumber,
            userOccupation: data.profession,
            userTelephone: data.telephone,
            userTown: data.town,
            userTypeID: data.typeIdDocument,
            created_At: timeStamp(),
            countryPrefix: data.countryPrefix,

        });

        res
            .status(200)
            .json({
                status: 200,
                message: "Registration Succeful👌. Please login"
            });

    }
    catch (error) { console.error(error); next({ status: error.status, message: error.msg }) }
}

module.exports = userRegister;