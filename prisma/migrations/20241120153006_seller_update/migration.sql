/*
  Warnings:

  - You are about to drop the `Billboard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Billboard" DROP CONSTRAINT "Billboard_storeId_fkey";

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "Billboard";
