import { parse } from "@babel/parser";

import { ExportNamedDeclaration } from "@babel/types";

export const parseExports = (inputCode: string) => {
  // TODO The sourceType should be set by config somewhere
  const babelResult = parse(inputCode, { sourceType: "module" });

  const {
    program: { body: programBody },
  } = babelResult;

  const exportNameDeclarationNodes = programBody.filter(
    ({ type }) => type === "ExportNamedDeclaration"
  ) as ExportNamedDeclaration[];

  const inlineNamedExports = exportNameDeclarationNodes
    .filter(({ declaration }) => declaration !== null)
    .flatMap(({ declaration: { declarations } }) => declarations)
    .map(({ id: { name } }) => name);

  const nonInlineNamedExports = exportNameDeclarationNodes
    .filter(({ declaration }) => declaration === null)
    .filter(({ specifiers }) => specifiers !== null)
    .flatMap(({ specifiers }) => specifiers)
    .map(({ exported: { name } }) => name);

  return { namedExports: [...inlineNamedExports, ...nonInlineNamedExports] };
};
