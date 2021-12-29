import { getInput, getTestFunction } from "../../helper";

const parse = (input: string): string[] => {
  return input
    .split(/\n/)
    .map((row) => row.trim())
    .filter((row) => !!row);
};

enum Direction {
  FORWARD = "forward",
  DOWN = "down",
  UP = "up",
}

enum Operation {
  INCREASE,
  DECREASE,
  MULTIPLY,
}

type Position = {
  horizontal: number;
  depth: number;
  aim: number;
};

const positionParamsPerDirectionsPart1: Record<
  Direction,
  { key: keyof Position; operation: Operation }
> = {
  [Direction.FORWARD]: {
    key: "horizontal",
    operation: Operation.INCREASE,
  },
  [Direction.DOWN]: {
    key: "depth",
    operation: Operation.INCREASE,
  },

  [Direction.UP]: {
    key: "depth",
    operation: Operation.DECREASE,
  },
};

const calculatePart1 = (input: string[]): number => {
  const finalPosition: Position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  input.forEach((value) => {
    const [direction, stringifiedUnits] = value.split(" ");
    const units = Number(stringifiedUnits);
    const { key, operation } =
      positionParamsPerDirectionsPart1[direction as Direction];
    if (operation === Operation.INCREASE) {
      finalPosition[key] += units;
    }
    if (operation === Operation.DECREASE) {
      finalPosition[key] -= units;
    }
  });

  return finalPosition.horizontal * finalPosition.depth;
};

const positionParamsPerDirectionsPart2: Record<
  Direction,
  Array<{ key: keyof Position; operation: Operation }>
> = {
  [Direction.FORWARD]: [
    {
      key: "horizontal",
      operation: Operation.INCREASE,
    },
    {
      key: "depth",
      operation: Operation.MULTIPLY,
    },
  ],
  [Direction.DOWN]: [
    {
      key: "aim",
      operation: Operation.INCREASE,
    },
  ],
  [Direction.UP]: [
    {
      key: "aim",
      operation: Operation.DECREASE,
    },
  ],
};

const calculatePart2 = (input: string[]): number => {
  const finalPosition: Position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  input.forEach((value) => {
    const [direction, stringifiedUnits] = value.split(" ");
    const units = Number(stringifiedUnits);
    const positionsParams =
      positionParamsPerDirectionsPart2[direction as Direction];
    positionsParams.forEach(({ key, operation }) => {
      if (operation === Operation.INCREASE) {
        finalPosition[key] += units;
      }
      if (operation === Operation.DECREASE) {
        finalPosition[key] -= units;
      }
      if (operation === Operation.MULTIPLY) {
        finalPosition[key] += finalPosition.aim * units;
      }
    });
  });

  return finalPosition.horizontal * finalPosition.depth;
};

const run = async () => {
  const YEAR = 2021;
  const DAY = 2;

  const input = await getInput(DAY, YEAR);
  const parsedInput = parse(input);

  const result1 = calculatePart1(parsedInput);
  const result2 = calculatePart2(parsedInput);
  return [result1, result2];
};

const tests = () => {
  const part1Test = getTestFunction((input) => calculatePart1(input));
  const part2Test = getTestFunction((input) => calculatePart2(input));
  const testInput =
    "forward 5\n" +
    "down 5\n" +
    "forward 8\n" +
    "up 3\n" +
    "down 8\n" +
    "forward 2";
  part1Test(parse(testInput), 150);
  console.log("-".repeat(25));
  part2Test(parse(testInput), 900);
  console.log("-".repeat(25));
};

tests();

(async () => {
  const [result1, result2] = await run();
  console.log("Part 1: ", result1);
  console.log("Part 2: ", result2);
})();
