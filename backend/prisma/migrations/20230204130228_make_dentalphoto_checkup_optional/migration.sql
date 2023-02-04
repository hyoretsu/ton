-- DropForeignKey
ALTER TABLE "DentalPhoto" DROP CONSTRAINT "DentalPhoto_checkupId_fkey";

-- AlterTable
ALTER TABLE "DentalPhoto" ALTER COLUMN "checkupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DentalPhoto" ADD CONSTRAINT "DentalPhoto_checkupId_fkey" FOREIGN KEY ("checkupId") REFERENCES "Checkup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
