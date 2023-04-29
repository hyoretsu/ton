-- CreateTable
CREATE TABLE "ObjectiveNotification" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "objectiveId" TEXT NOT NULL,
    "patientId" TEXT,

    CONSTRAINT "ObjectiveNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ObjectiveNotification" ADD CONSTRAINT "ObjectiveNotification_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectiveNotification" ADD CONSTRAINT "ObjectiveNotification_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
