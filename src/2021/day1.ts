import { getInput, getTestFunction } from '../../helper';

const parse = (input: string): string[] => {
  return input.split(/\n/)
    .map(row => row.trim())
    .filter(row => !!row);
};

const calculatePart1 = (input: string[]): number => {
  let counter = 0;
  input
    .map(Number)
    .reduce((previousValue, currentValue) => {
      if (previousValue && currentValue > previousValue) {
        counter += 1;
      }
      return currentValue;
    }, 0);

  return counter;
};

const calculatePart2 = (input: string[]): number => {
  let counter = 0;
  input
    .map(Number)
    .reduce((previousSlicingWindowSum, currentValue, currentIndex, array) => {
      const currentSlicingWindowSum = array[currentIndex] + array[currentIndex + 1] + array[currentIndex + 2];
      if (previousSlicingWindowSum && currentSlicingWindowSum > previousSlicingWindowSum) {
        counter += 1;
      }
      return currentSlicingWindowSum;
    }, 0);

  return counter;
};

const run = async () => {
  const YEAR = 2021;
  const DAY = 1;

  const input = await getInput(DAY, YEAR);
  const parsedInput = parse(input);

  const result1 = calculatePart1(parsedInput);
  const result2 = calculatePart2(parsedInput);
  return [result1, result2];
};

const tests = () => {
  const part1Test = getTestFunction((input) => calculatePart1(input));
  const part2Test = getTestFunction((input) => calculatePart2(input));
  const testInput = '199\n' +
    '200\n' +
    '208\n' +
    '210\n' +
    '200\n' +
    '207\n' +
    '240\n' +
    '269\n' +
    '260\n' +
    '263';
  part1Test(parse(testInput), 7);
  console.log('-'.repeat(25));
  part2Test(parse(testInput), 5);
  console.log('-'.repeat(25));
};

tests();

(async () => {
  const [result1, result2] = await run();
  console.log('Part 1: ', result1);
  console.log('Part 2: ', result2);
})();
