/*
  Warnings:

  - Changed the type of `goal` on the `Objective` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Objective" DROP COLUMN "goal",
ADD COLUMN     "goal" INTEGER NOT NULL;
