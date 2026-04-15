export interface LevelProgressState {
  level: number;
  totalXp: number;
  totalSessions: number;
  currentStreak: number;
  levelXpProgress: number;
  levelDaysProgress: number;
}

export interface LevelRequirement {
  xpRequired: number;
  daysRequired: number;
}

export const getLevelRequirement = (level: number): LevelRequirement => ({
  xpRequired: level * 100,
  daysRequired: level
});

export const getProgressSnapshot = (level: number, levelXpProgress: number, levelDaysProgress: number) => {
  const requirement = getLevelRequirement(level);

  return {
    currentLevel: level,
    nextLevel: level + 1,
    xpInLevel: levelXpProgress,
    xpRequiredForNextLevel: requirement.xpRequired,
    completedDaysInLevel: levelDaysProgress,
    completedDaysRequiredForNextLevel: requirement.daysRequired,
    remainingXp: Math.max(requirement.xpRequired - levelXpProgress, 0),
    remainingCompletedDays: Math.max(requirement.daysRequired - levelDaysProgress, 0)
  };
};

export const getStreakBonus = (streak: number) => {
  if (streak === 10) {
    return 200;
  }

  if (streak === 5) {
    return 150;
  }

  return 0;
};

export const isNextCalendarDay = (previousDay: Date, currentDay: Date) => {
  const diffMs = currentDay.getTime() - previousDay.getTime();
  return diffMs === 24 * 60 * 60 * 1000;
};

export const applyWorkoutCompletionProgress = (state: LevelProgressState, xpAwarded: number) => {
  let nextLevel = state.level;
  let nextLevelXpProgress = state.levelXpProgress + xpAwarded;
  let nextLevelDaysProgress = state.levelDaysProgress + 1;
  let leveledUp = false;

  while (true) {
    const requirement = getLevelRequirement(nextLevel);

    if (
      nextLevelXpProgress < requirement.xpRequired ||
      nextLevelDaysProgress < requirement.daysRequired
    ) {
      break;
    }

    nextLevelXpProgress -= requirement.xpRequired;
    nextLevelDaysProgress -= requirement.daysRequired;
    nextLevel += 1;
    leveledUp = true;
  }

  return {
    level: nextLevel,
    totalXp: state.totalXp + xpAwarded,
    totalSessions: state.totalSessions + 1,
    currentStreak: state.currentStreak,
    levelXpProgress: nextLevelXpProgress,
    levelDaysProgress: nextLevelDaysProgress,
    leveledUp,
    xpAwarded,
    progress: getProgressSnapshot(nextLevel, nextLevelXpProgress, nextLevelDaysProgress)
  };
};
