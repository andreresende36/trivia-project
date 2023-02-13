export const calcDifficultyIndex = (difficulty) => {
  const easyIndex = 1;
  const mediumIndex = 2;
  const hardIndex = 3;

  switch (difficulty) {
  case 'easy':
    return easyIndex;
  case 'medium':
    return mediumIndex;
  case 'hard':
    return hardIndex;
  default:
    return null;
  }
};
