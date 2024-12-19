/*
  Warnings:

  - You are about to drop the column `SellerProductId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `billingCountry` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `billingCountryCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `billingProvince` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `billingProvinceCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `codAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `currencyCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerEmail` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingCountry` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingCountryCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingProvince` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingProvinceCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shopifyOrderId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Design` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LineItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_id` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SellerProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ColorToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImageToManu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToSize` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sellerId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyHtml` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendor` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Design" DROP CONSTRAINT "Design_ManuId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Manu" DROP CONSTRAINT "Manu_SellerId_fkey";

-- DropForeignKey
ALTER TABLE "Manu" DROP CONSTRAINT "Manu_productId_fkey";

-- DropForeignKey
ALTER TABLE "Mock" DROP CONSTRAINT "Mock_ManuId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_SellerProductId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Product_id" DROP CONSTRAINT "Product_id_SellerProductId_fkey";

-- DropForeignKey
ALTER TABLE "SellerProduct" DROP CONSTRAINT "SellerProduct_ManuId_fkey";

-- DropForeignKey
ALTER TABLE "SellerProduct" DROP CONSTRAINT "SellerProduct_SellerId_fkey";

-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_storeId_fkey";

-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToManu" DROP CONSTRAINT "_ImageToManu_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToManu" DROP CONSTRAINT "_ImageToManu_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSize" DROP CONSTRAINT "_ProductToSize_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSize" DROP CONSTRAINT "_ProductToSize_B_fkey";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- DropIndex
DROP INDEX "Product_storeId_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "SellerProductId",
DROP COLUMN "billingCountry",
DROP COLUMN "billingCountryCode",
DROP COLUMN "billingProvince",
DROP COLUMN "billingProvinceCode",
DROP COLUMN "codAmount",
DROP COLUMN "currencyCode",
DROP COLUMN "customerEmail",
DROP COLUMN "customerId",
DROP COLUMN "customerPhone",
DROP COLUMN "shippingCountry",
DROP COLUMN "shippingCountryCode",
DROP COLUMN "shippingProvince",
DROP COLUMN "shippingProvinceCode",
DROP COLUMN "shopifyOrderId",
DROP COLUMN "totalAmount",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "shopifyId" BIGINT,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
DROP COLUMN "description",
DROP COLUMN "isArchived",
DROP COLUMN "isFeatured",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "storeId",
ADD COLUMN     "bodyHtml" TEXT NOT NULL,
ADD COLUMN     "productType" TEXT NOT NULL,
ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "shopifyId" BIGINT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "vendor" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "Design";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "LineItem";

-- DropTable
DROP TABLE "Manu";

-- DropTable
DROP TABLE "Mock";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Product_id";

-- DropTable
DROP TABLE "SellerProduct";

-- DropTable
DROP TABLE "Size";

-- DropTable
DROP TABLE "Store";

-- DropTable
DROP TABLE "_ColorToProduct";

-- DropTable
DROP TABLE "_ImageToManu";

-- DropTable
DROP TABLE "_ProductToSize";

-- CreateTable
CREATE TABLE "ProductOption" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "values" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sku" TEXT,
    "inventoryQty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_email_key" ON "Seller"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sellerId_key" ON "Session"("sellerId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
