export const formatRank = (rank: number | null): string => {
  return rank === null ? "Unranked" : `#${rank}`;
};

