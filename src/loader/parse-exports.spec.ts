import { parseExports } from "./parse-exports";

it("can parse single named export", () => {
  const INPUT = `
    export const inlineNamedExport = () => {}
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(1);
  expect(exports.namedExports[0]).toBe("inlineNamedExport");
});

it("can parse single named export when its not exported inline", () => {
  const INPUT = `
    const nameExportNotInline = () => {};

    export { nameExportNotInline };
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(1);
  expect(exports.namedExports[0]).toBe("nameExportNotInline");
});

it("can parse named exports when they are comma seperated", () => {
  const INPUT = `
    export const namedExportOne = 1, namedExportTwo = 2;
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(2);
  expect(exports.namedExports).toContain("namedExportOne");
  expect(exports.namedExports).toContain("namedExportTwo");
});
