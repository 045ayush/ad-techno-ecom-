/*
  Warnings:

  - You are about to drop the column `userId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_userId_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "highlights" TEXT[];

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "createdAt",
ADD COLUMN     "quantity" INTEGER NOT NULL;
