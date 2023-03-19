/*
  Warnings:

  - You are about to drop the column `patientId` on the `Medicine` table. All the data in the column will be lost.
  - You are about to drop the `HematologyInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `relationId` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HematologyInfo" DROP CONSTRAINT "HematologyInfo_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_patientId_fkey";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "patientId",
ADD COLUMN     "relationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "HematologyInfo";

-- CreateTable
CREATE TABLE "Hematology" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "redCells" DOUBLE PRECISION NOT NULL,
    "platelets" DOUBLE PRECISION NOT NULL,
    "leukocytes" DOUBLE PRECISION NOT NULL,
    "neutrophils" DOUBLE PRECISION NOT NULL,
    "patientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hematology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineRelation" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicineRelation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hematology" ADD CONSTRAINT "Hematology_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "MedicineRelation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineRelation" ADD CONSTRAINT "MedicineRelation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
