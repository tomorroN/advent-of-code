import * as http from "https";

const session =
  "53616c7465645f5f5e40087102b96ea8cd8fbfa1b0684f8ace69cb16bba72d1b8cb70658dc513847903d0a558e2a20d3";

export function getInput(day: number, year = 2020): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      host: "adventofcode.com",
      path: `/${year}/day/${day}/input`,
      headers: { Cookie: `session=${session}` },
    };

    const req = http.request(options, (response) => {
      let str = "";

      response.on("data", (chunk: string) => {
        str += chunk;
      });

      response.on("end", () => {
        if (str.charAt(str.length - 1) === "\n") {
          str = str.slice(0, -1);
        }
        resolve(str);
      });
    });

    req.on("error", (e: unknown) => {
      reject(e);
    });

    req.end();
  });
}

export function getTestFunction(
  call: (input: string[]) => number
): (data: string[], expected: unknown) => boolean {
  return (data: string[], expected: unknown) => {
    const actual = call(data);
    if (actual === expected) {
      console.log(
        "\x1b[32mSuccess test\x1b[0m:\x1b[36m",
        data,
        "\x1b[32m",
        actual,
        "\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31mFail test\x1b[0m:\x1b[36m",
        data,
        "\x1b[0mexpected:\x1b[33m",
        expected,
        "\x1b[0mactual:\x1b[31m",
        actual
      );
    }

    return actual === expected;
  };
}
