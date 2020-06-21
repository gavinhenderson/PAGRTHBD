import { parseExports } from "./parse-exports";

it("can parse single named export", () => {
  const INPUT = `
        export const helloWorld = () => {}
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(1);
  expect(exports.namedExports[0]).toBe("helloWorld");
});
