import { parse } from "@babel/parser";

import { ExportNamedDeclaration, VariableDeclaration } from "@babel/types";

export const parseExports = (inputCode: string) => {
  // TODO The sourceType should be set by config somewhere
  const babelResult = parse(inputCode, { sourceType: "module" });

  const {
    program: { body: programBody },
  } = babelResult;

  const defaultExportNode = programBody.find(
    (node) => node.type === "ExportDefaultDeclaration"
  );
  const hasDefaultExport = !!defaultExportNode;

  const exportNameDeclarationNodes = programBody.filter(
    ({ type }) => type === "ExportNamedDeclaration"
  ) as ExportNamedDeclaration[];

  const inlineNamedExports = exportNameDeclarationNodes
    .filter(({ declaration }) => declaration !== null)
    .map(({ declaration }) => declaration)
    .flatMap(({ declarations }: VariableDeclaration) => declarations)
    .map(({ id: { name } }: any) => name);

  const nonInlineNamedExports = exportNameDeclarationNodes
    .filter(({ declaration }) => declaration === null)
    .filter(({ specifiers }) => specifiers !== null)
    .flatMap(({ specifiers }) => specifiers)
    .map(({ exported: { name } }) => name);

  const namedExports = [].concat(inlineNamedExports, nonInlineNamedExports);

  if (hasDefaultExport === false && namedExports.length === 0) {
    throw new Error("Input has no default or named exports");
  }

  return {
    namedExports,
    hasDefaultExport,
  };
};
