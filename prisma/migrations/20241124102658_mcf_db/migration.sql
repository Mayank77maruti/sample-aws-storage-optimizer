-- CreateTable
CREATE TABLE "MCFShipment" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'in_progress',
    "shippingMethod" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "trackingUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MCFShipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MCFShipmentToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MCFShipmentToProduct_AB_unique" ON "_MCFShipmentToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_MCFShipmentToProduct_B_index" ON "_MCFShipmentToProduct"("B");

-- AddForeignKey
ALTER TABLE "MCFShipment" ADD CONSTRAINT "MCFShipment_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCFShipment" ADD CONSTRAINT "MCFShipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MCFShipmentToProduct" ADD CONSTRAINT "_MCFShipmentToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "MCFShipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MCFShipmentToProduct" ADD CONSTRAINT "_MCFShipmentToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
