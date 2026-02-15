/*
  Warnings:

  - You are about to drop the column `name` on the `role` table. All the data in the column will be lost.
  - Added the required column `role_name` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Role_name_key` ON `role`;

-- AlterTable
ALTER TABLE `role` DROP COLUMN `name`,
    ADD COLUMN `role_name` VARCHAR(191) NOT NULL;
