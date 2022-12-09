// Dependencies
const { PrismaClient } = require("@prisma/client")


// Instanciate
const prisma = new PrismaClient();

const createNewUser = async ({
    userReference,
    userFirstName,
    userLastName,
    userEmail,
    countryPrefix,
    userTelephone,
    userDepartment,
    userTown,
    userDistrict,
    userNeighborhood,
    userTypeID,
    userNumberIdDocument,
    userAddress,
    userOccupation,
    userBirthday,
    userGender,
    created_At
}) => {
    const newUser = await prisma.users.create({
        data: {
            user_reference: userReference,
            user_address: userAddress,
            user_birthday: userBirthday,
            user_department: userDepartment,
            user_district: userDistrict,
            user_email: userEmail,
            user_first_name: userFirstName,
            user_last_name: userLastName,
            user_gender: userGender,
            user_neighborhood: userNeighborhood,
            user_number_id_document: userNumberIdDocument,
            user_profession: userOccupation,
            user_telephone: userTelephone,
            user_town: userTown,
            user_type_id: userTypeID,
            created_at: created_At,
            country_prefix: countryPrefix
        }
    });

    await prisma.$disconnect();
    return newUser;
}

const updateOneUser = async ({
    userReference,
    userFirstName,
    userLastName,
    userEmail,
    countryPrefix,
    userTelephone,
    userDepartment,
    userTown,
    userDistrict,
    userNeighborhood,
    userTypeID,
    userNumberIdDocument,
    userAddress,
    userOccupation,
    userBirthday,
    userGender,
}) => {
    const update = await prisma.users.update({
        where: {
            user_reference: userReference
        },
        data: {
            user_address: userAddress,
            user_birthday: userBirthday,
            user_department: userDepartment,
            user_district: userDistrict,
            user_email: userEmail,
            user_first_name: userFirstName,
            user_last_name: userLastName,
            user_gender: userGender,
            user_neighborhood: userNeighborhood,
            user_number_id_document: userNumberIdDocument,
            user_profession: userOccupation,
            user_telephone: userTelephone,
            user_town: userTown,
            user_type_id: userTypeID,
            country_prefix: countryPrefix
        }
    });

    await prisma.$disconnect();
    return update;
}

const deleteOneUser = async (userReference) => {
    const _delete = await prisma.users.delete({
        where: {
            user_reference: userReference
        }
    });

    await prisma.$disconnect();
    return _delete;
}

const getOneUserWithReference = async (userReference) => {
    const user = await prisma.users.findFirst({
        where: {
            user_reference: userReference
        }
    });

    await prisma.$disconnect();
    return user;
}

const getOneUserWithEmail = async (userEmail) => {
    const user = await prisma.users.findFirst({
        where: {
            user_email: userEmail
        }
    });

    await prisma.$disconnect();
    return user;
}


module.exports = {
    createNewUser,
    updateOneUser,
    deleteOneUser,
    getOneUserWithReference,
    getOneUserWithEmail
}