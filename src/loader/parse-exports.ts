import { parse } from "@babel/parser";

export const parseExports = (inputCode: string) => {
  // TODO The sourceType should be set by config somewhere
  const babelResult = parse(inputCode, { sourceType: "module" });

  const {
    program: { body: programBody },
  } = babelResult;

  // TODO Make this not an any
  const exportNameDeclarationNodes: any[] = programBody.filter(
    ({ type }) => type === "ExportNamedDeclaration"
  );

  // TODO This super deep destructuring is probably pretty unsafe, although if we fix the types that might not matter
  const namedExports = exportNameDeclarationNodes.map(
    ({
      declaration: {
        declarations: [
          {
            id: { name },
          },
        ],
      },
    }: {
      declaration: any;
    }) => name
  ) as any;

  return { namedExports };
};
