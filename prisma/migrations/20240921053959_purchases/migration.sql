/*
  Warnings:

  - You are about to drop the `BankAccount` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paymentFrom` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_purchaseId_fkey";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "paymentFrom" INTEGER NOT NULL;

-- DropTable
DROP TABLE "BankAccount";
