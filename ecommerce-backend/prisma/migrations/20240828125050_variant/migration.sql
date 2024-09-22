/*
  Warnings:

  - You are about to drop the column `discounte` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `discounte` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercent` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discountedPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `numRatings` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.
  - Added the required column `variantId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "discounte",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "productId",
DROP COLUMN "size",
ADD COLUMN     "variantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discounte",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productId",
DROP COLUMN "size",
ADD COLUMN     "variantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brand",
DROP COLUMN "color",
DROP COLUMN "discountPercent",
DROP COLUMN "discountedPrice",
DROP COLUMN "imageUrl",
DROP COLUMN "numRatings",
DROP COLUMN "price",
DROP COLUMN "quantity",
DROP COLUMN "sizes";

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "variantName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountedPrice" DOUBLE PRECISION NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "specifications" JSONB NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
