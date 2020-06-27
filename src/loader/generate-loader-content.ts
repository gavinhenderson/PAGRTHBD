type ExportsDefinition = {
  namedExports: string[];
  hasDefaultExport: boolean;
};

const generateLoaderContent = (
  callBackendFunc: string,
  { namedExports, hasDefaultExport }: ExportsDefinition
) => {
  const namedExportsStrings = namedExports.map(
    (currentExport) =>
      `export const ${currentExport} = callBackendFunc("${currentExport}");`
  );

  const callBackend = `const callBackendFunc = ${callBackendFunc}`;
  const defaultExport =
    'const defaultExport = callBackendFunc("defaultExport"); export default defaultExport;';

  return [
    callBackend,
    ...namedExportsStrings,
    hasDefaultExport ? defaultExport : "",
  ].filter(emptyStrings);
};

const emptyStrings = (test: string) => test !== "";

export default generateLoaderContent;
