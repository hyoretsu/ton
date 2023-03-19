/*
  Warnings:

  - A unique constraint covering the columns `[chartNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_chartNumber_key" ON "User"("chartNumber");
