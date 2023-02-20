/*
  Warnings:

  - You are about to drop the column `prequelId` on the `ContentMessage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContentMessage" DROP CONSTRAINT "ContentMessage_prequelId_fkey";

-- DropIndex
DROP INDEX "ContentMessage_prequelId_key";

-- AlterTable
ALTER TABLE "ContentMessage" DROP COLUMN "prequelId",
ADD COLUMN     "sequelId" TEXT;

-- AddForeignKey
ALTER TABLE "ContentMessage" ADD CONSTRAINT "ContentMessage_sequelId_fkey" FOREIGN KEY ("sequelId") REFERENCES "ContentMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
