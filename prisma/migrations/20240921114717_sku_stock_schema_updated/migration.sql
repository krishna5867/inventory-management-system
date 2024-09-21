/*
  Warnings:

  - You are about to drop the column `skuId` on the `Stock` table. All the data in the column will be lost.
  - You are about to drop the column `stockQuantity` on the `Stock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_skuId_fkey";

-- DropIndex
DROP INDEX "Stock_skuId_warehouseLocation_key";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "skuId",
DROP COLUMN "stockQuantity";

-- CreateTable
CREATE TABLE "StockItem" (
    "id" SERIAL NOT NULL,
    "skuId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockItem_stockId_skuId_key" ON "StockItem"("stockId", "skuId");

-- AddForeignKey
ALTER TABLE "StockItem" ADD CONSTRAINT "StockItem_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockItem" ADD CONSTRAINT "StockItem_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "SkuStock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
