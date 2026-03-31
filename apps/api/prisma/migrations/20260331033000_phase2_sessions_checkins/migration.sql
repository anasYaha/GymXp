-- CreateTable
CREATE TABLE "BranchSessionOption" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coachName" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "durationMins" INTEGER NOT NULL,
    "muscleGroup" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BranchSessionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionAttendance" (
    "id" TEXT NOT NULL,
    "sessionOptionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "checkedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BranchSessionOption_branchId_startsAt_idx" ON "BranchSessionOption"("branchId", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "SessionAttendance_sessionOptionId_userId_key" ON "SessionAttendance"("sessionOptionId", "userId");

-- CreateIndex
CREATE INDEX "SessionAttendance_userId_branchId_checkedInAt_idx" ON "SessionAttendance"("userId", "branchId", "checkedInAt");

-- AddForeignKey
ALTER TABLE "BranchSessionOption" ADD CONSTRAINT "BranchSessionOption_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "GymBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAttendance" ADD CONSTRAINT "SessionAttendance_sessionOptionId_fkey" FOREIGN KEY ("sessionOptionId") REFERENCES "BranchSessionOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAttendance" ADD CONSTRAINT "SessionAttendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAttendance" ADD CONSTRAINT "SessionAttendance_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "GymBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
