ALTER TABLE "User"
ADD COLUMN "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "levelXpProgress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "levelDaysProgress" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "WorkoutSession"
ADD COLUMN "completionDay" TIMESTAMP(3);

CREATE UNIQUE INDEX "WorkoutSession_userId_completionDay_key"
ON "WorkoutSession"("userId", "completionDay");
