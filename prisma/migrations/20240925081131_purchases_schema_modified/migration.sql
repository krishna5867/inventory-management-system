/*
  Warnings:

  - The `purchaseBill` column on the `Purchase` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchaseBill",
ADD COLUMN     "purchaseBill" BYTEA,
ALTER COLUMN "paymentFrom" DROP NOT NULL;
