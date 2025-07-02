-- DropForeignKey
ALTER TABLE "MerchantBalance" DROP CONSTRAINT "MerchantBalance_merchantId_fkey";

-- AddForeignKey
ALTER TABLE "MerchantBalance" ADD CONSTRAINT "MerchantBalance_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
