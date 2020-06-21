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

  const inlineExports = exportNameDeclarationNodes.filter(
    ({ declaration }) => declaration !== null
  );

  const nonInlineExports = exportNameDeclarationNodes.filter(
    ({ declaration }) => declaration === null
  );

  const nonInlineNamedExports = nonInlineExports.map(
    ({
      specifiers: [
        {
          exported: { name },
        },
      ],
    }) => name
  );

  // TODO This super deep destructuring is probably pretty unsafe
  const inlineNamedExports = inlineExports.map(
    ({
      declaration: {
        declarations: [
          {
            id: { name },
          },
        ],
      },
    }) => name
  );

  return { namedExports: [...inlineNamedExports, ...nonInlineNamedExports] };
};
