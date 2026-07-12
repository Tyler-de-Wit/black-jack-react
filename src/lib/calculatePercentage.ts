function calculatePercentage(partialValue: number, totalValue: number) {
  // Prevent a division by 0
  if (totalValue === 0) return 0;

  // Calculate answer
  let answer = (partialValue / totalValue) * 100;

  return answer.toFixed(2);
}

export default calculatePercentage;
