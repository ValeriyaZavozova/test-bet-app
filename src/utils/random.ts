export function getRandomNumber(min: number, max: number): number {
  return Math.random() * max + min;
}

export function generateRandomNumberWithDelay(delay: {
  min: number;
  max: number;
}): Promise<number> {
  return new Promise((resolve) => {
    const randomProcessingTimeSec = getRandomNumber(delay.min, delay.max);
    setTimeout(() => {
      const result = Math.floor(Math.random() * 100);
      resolve(result);
    }, randomProcessingTimeSec * 1000);
  });
}
