/*
  Warnings:

  - You are about to alter the column `telephone` on the `student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `Student_telephone_key` ON `student`;

-- AlterTable
ALTER TABLE `student` MODIFY `telephone` INTEGER NOT NULL;
