type ExportsDefinition = {
  namedExports: string[];
  hasDefaultExport: boolean;
};

const generateLoaderContent = (
  callBackendFunc: string,
  basename: string,
  { namedExports, hasDefaultExport }: ExportsDefinition
) => {
  const namedExportsStrings = namedExports.map(
    (currentExport) =>
      `export const ${currentExport} = callBackendFunc("${currentExport}", "${basename}");`
  );

  const callBackend = `const callBackendFunc = ${callBackendFunc}`;
  const defaultExport = `const defaultExport = callBackendFunc("defaultExport", "${basename}"); export default defaultExport;`;

  return [
    callBackend,
    ...namedExportsStrings,
    hasDefaultExport ? defaultExport : "",
  ].filter(emptyStrings);
};

const emptyStrings = (test: string) => test !== "";

export default generateLoaderContent;
