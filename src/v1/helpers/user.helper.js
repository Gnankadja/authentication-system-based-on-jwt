const { getLastUser } = require("../services/user.service");

const generateUserReference = async () => {

    try {
        let lastUserReference;
        const lastUser = await getLastUser();

        if (lastUser != null) {
            lastUserReference = lastUser.user_reference;
        }
        else lastUserReference = "USER" + '0';

        let id = lastUserReference.replace(/\D/g, '');

        if (id !== '') {
            id = Number.parseInt(id); id++;
            let charId = String(id);

            if (charId.length < 6) {
                charId = charId.padStart(6, '0');
            }

            let newReference = 'USER' + charId;
            return newReference;
        }
        else throw new Error("User reference generation error");
    }
    catch (error) { throw new Error("An user reference generation error was observed; Please try again later") }
}

module.exports = {
    generateUserReference
}
