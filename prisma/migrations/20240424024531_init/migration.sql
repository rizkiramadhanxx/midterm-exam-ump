-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_telephone_key`(`telephone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
