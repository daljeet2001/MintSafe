/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_number_key" ON "Merchant"("number");
