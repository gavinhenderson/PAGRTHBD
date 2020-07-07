import generateLoaderContent from "./generate-loader-content";

// TODO Formatting matters for these tests, ideally it wouldnt

const CALL_BACKEND_FUNC = `(funcName) => (param) => { console.log(param, "test", funcName); }`;

it("outputs one named export correctly", () => {
  const result = generateLoaderContent(CALL_BACKEND_FUNC, "test.js", {
    namedExports: ["testExports"],
    hasDefaultExport: false,
  });

  expect(result).toHaveLength(2);
  expect(result[0]).toBe(
    'const callBackendFunc = (funcName) => (param) => { console.log(param, "test", funcName); }'
  );
  expect(result[1]).toBe(
    'export const testExports = callBackendFunc("testExports", "test.js");'
  );
});

it("outputs one named export correctly", () => {
  const result = generateLoaderContent(CALL_BACKEND_FUNC, "test.js", {
    namedExports: ["testExports", "secondExport"],

    hasDefaultExport: false,
  });

  expect(result).toHaveLength(3);
  expect(result[0]).toBe(
    'const callBackendFunc = (funcName) => (param) => { console.log(param, "test", funcName); }'
  );
  expect(result[1]).toBe(
    'export const testExports = callBackendFunc("testExports", "test.js");'
  );
  expect(result[2]).toBe(
    'export const secondExport = callBackendFunc("secondExport", "test.js");'
  );
});

it("outputs default export correctly", () => {
  const result = generateLoaderContent(CALL_BACKEND_FUNC, "test.js", {
    namedExports: [],
    hasDefaultExport: true,
  });

  expect(result).toHaveLength(2);
  expect(result[0]).toBe(
    'const callBackendFunc = (funcName) => (param) => { console.log(param, "test", funcName); }'
  );
  expect(result[1]).toBe(
    'const defaultExport = callBackendFunc("defaultExport", "test.js"); export default defaultExport;'
  );
});

it("outputs default export with multiple named exports", () => {
  const result = generateLoaderContent(CALL_BACKEND_FUNC, "test.js", {
    namedExports: ["testExports", "secondExport"],
    hasDefaultExport: true,
  });

  expect(result).toHaveLength(4);
  expect(result[0]).toBe(
    'const callBackendFunc = (funcName) => (param) => { console.log(param, "test", funcName); }'
  );
  expect(result[1]).toBe(
    'export const testExports = callBackendFunc("testExports", "test.js");'
  );
  expect(result[2]).toBe(
    'export const secondExport = callBackendFunc("secondExport", "test.js");'
  );
  expect(result[3]).toBe(
    'const defaultExport = callBackendFunc("defaultExport", "test.js"); export default defaultExport;'
  );
});
