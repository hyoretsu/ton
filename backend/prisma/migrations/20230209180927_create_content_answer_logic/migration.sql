/*
  Warnings:

  - You are about to drop the column `contentId` on the `ContentMessage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstMessageId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prequelId]` on the table `ContentMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionId]` on the table `ContentMessage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstMessageId` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContentMessage" DROP CONSTRAINT "ContentMessage_contentId_fkey";

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "firstMessageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContentMessage" DROP COLUMN "contentId",
ADD COLUMN     "prequelId" TEXT,
ADD COLUMN     "questionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Content_firstMessageId_key" ON "Content"("firstMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentMessage_prequelId_key" ON "ContentMessage"("prequelId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentMessage_questionId_key" ON "ContentMessage"("questionId");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_firstMessageId_fkey" FOREIGN KEY ("firstMessageId") REFERENCES "ContentMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentMessage" ADD CONSTRAINT "ContentMessage_prequelId_fkey" FOREIGN KEY ("prequelId") REFERENCES "ContentMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentMessage" ADD CONSTRAINT "ContentMessage_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ContentMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
