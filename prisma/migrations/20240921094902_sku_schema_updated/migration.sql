-- CreateTable
CREATE TABLE "SkuStock" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkuStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "skuId" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "warehouseLocation" TEXT NOT NULL,
    "orderDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkuStock_sku_key" ON "SkuStock"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_skuId_warehouseLocation_key" ON "Stock"("skuId", "warehouseLocation");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "SkuStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
