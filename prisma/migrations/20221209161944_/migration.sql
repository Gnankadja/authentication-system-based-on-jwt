-- CreateTable
CREATE TABLE `users` (
    `user_reference` VARCHAR(100) NOT NULL,
    `user_first_name` VARCHAR(100) NULL,
    `user_last_name` VARCHAR(100) NULL,
    `user_telephone` INTEGER NULL,
    `country_prefix` INTEGER NULL,
    `user_email` VARCHAR(100) NULL,
    `user_department` VARCHAR(100) NULL,
    `user_town` VARCHAR(100) NULL,
    `user_district` VARCHAR(100) NULL,
    `user_neighborhood` VARCHAR(100) NULL,
    `user_type_id` VARCHAR(100) NULL,
    `user_number_id_document` VARCHAR(100) NULL,
    `user_address` VARCHAR(100) NULL,
    `user_profession` VARCHAR(100) NULL,
    `user_birthday` VARCHAR(10) NULL,
    `user_gender` VARCHAR(100) NULL,
    `created_at` INTEGER NULL,
    `user_password` VARCHAR(3000) NULL,

    UNIQUE INDEX `users_un`(`user_email`, `user_telephone`),
    PRIMARY KEY (`user_reference`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
