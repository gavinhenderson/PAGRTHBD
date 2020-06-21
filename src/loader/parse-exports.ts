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

  // TODO This super deep destructuring is probably pretty unsafe
  const namedExports = exportNameDeclarationNodes.map(
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

  return { namedExports };
};
