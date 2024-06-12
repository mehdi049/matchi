-- CreateTable
CREATE TABLE "UserAttendance" (
    "userId" TEXT NOT NULL,
    "addedActivityId" INTEGER NOT NULL,

    CONSTRAINT "UserAttendance_pkey" PRIMARY KEY ("userId","addedActivityId")
);

-- AddForeignKey
ALTER TABLE "UserAttendance" ADD CONSTRAINT "UserAttendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAttendance" ADD CONSTRAINT "UserAttendance_addedActivityId_fkey" FOREIGN KEY ("addedActivityId") REFERENCES "AddedActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
