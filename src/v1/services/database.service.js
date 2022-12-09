// Dependencies
const { PrismaClient } = require('@prisma/client');

// Instantiate
const prisma = new PrismaClient();

// Verify database server
(async () => {
    prisma.$connect()
        .then(async (success) => {
            console.log("Database service started succeful");
            await prisma.$disconnect()
        })
        .catch(async (error) => {
            console.log("Database service start failed");
            console.log("Error: ", error);
            await prisma.$disconnect()
        })
})();

