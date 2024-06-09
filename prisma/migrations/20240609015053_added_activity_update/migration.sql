/*
  Warnings:

  - Added the required column `activityId` to the `AddedActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddedActivity" ADD COLUMN     "activityId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AddedActivity" ADD CONSTRAINT "AddedActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
