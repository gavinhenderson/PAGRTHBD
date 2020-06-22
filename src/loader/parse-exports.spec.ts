import { parseExports } from "./parse-exports";

it("can parse single named export when exported inline", () => {
  const INPUT = `
    export const inlineNamedExport = () => {}
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(1);
  expect(exports.namedExports[0]).toBe("inlineNamedExport");
  expect(exports.hasDefaultExport).toBe(false);
});

it("can parse single named export when its not exported inline", () => {
  const INPUT = `
    const nameExportNotInline = () => {};

    export { nameExportNotInline };
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(1);
  expect(exports.namedExports[0]).toBe("nameExportNotInline");
  expect(exports.hasDefaultExport).toBe(false);
});

it("can parse named exports when they are comma seperated", () => {
  const INPUT = `
    export const namedExportOne = 1, namedExportTwo = 2;
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(2);
  expect(exports.namedExports).toContain("namedExportOne");
  expect(exports.namedExports).toContain("namedExportTwo");
  expect(exports.hasDefaultExport).toBe(false);
});

it("can parse named exports when they not inline and there are multiple exports", () => {
  const INPUT = `
    const namedExportOne = 1;
    const namedExportTwo = 2;

    export {
      namedExportOne,
      namedExportTwo
    };
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(2);
  expect(exports.namedExports).toContain("namedExportOne");
  expect(exports.namedExports).toContain("namedExportTwo");
  expect(exports.hasDefaultExport).toBe(false);
});

it("can parse a default export", () => {
  const INPUT = `
    const defaultExport = () => {};

    export default defaultExport;
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(0);
  expect(exports.hasDefaultExport).toBe(true);
});

it("can parse a default export and named exports", () => {
  const INPUT = `
    const defaultExport = () => {};

    export const inlineNamedExport = () => {}

    export default defaultExport;
    `;

  const exports = parseExports(INPUT);

  expect(exports.namedExports).toHaveLength(1);
  expect(exports.namedExports[0]).toBe("inlineNamedExport");
  expect(exports.hasDefaultExport).toBe(true);
});

it("throws an error if you pass something without any exports", () => {
  const INPUT = `
    const defaultExport = () => {};
    `;

  expect(() => parseExports(INPUT)).toThrowError(
    "Input has no default or named exports"
  );
});
