-- DropForeignKey
ALTER TABLE "HematologyInfo" DROP CONSTRAINT "HematologyInfo_id_fkey";

-- AddForeignKey
ALTER TABLE "HematologyInfo" ADD CONSTRAINT "HematologyInfo_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
