// import { getOptions } from "loader-utils";
// import validateOptions from "schema-utils";

// const schema = {
//   type: "object",
//   properties: {
//     test: {
//       type: "string",
//     },
//   },
// };

// THINGS THAT WILL BREAK

// export const a = 1, b=2

// const myThing = 'test'
// export {myThing}

import { parse } from "@babel/parser";

export default function (source: BufferSource) {
  // const options = getOptions(this);
  // validateOptions(schema, options, "Example Loader");

  const parsedCode = parse(source.toString(), { sourceType: "module" });
  const nodes = (parsedCode.program.body as any).filter(
    ({ type, declaration }: any) =>
      type === "ExportNamedDeclaration" && declaration !== null
  ) as any;

  const funcNames = nodes.map(
    ({ declaration }: { declaration: any }) =>
      declaration.declarations[0].id.name
  ) as any;

  let output = ``;

  for (const func of funcNames) {
    output += `
        export const ${func} = async () => {
            // Do fetch shit
            console.log('${func}')           
        }
      `;
  }

  // console.log(parsedCode.program.body);
  // const decleration = parsedCode.program.body[1] as any;
  // console.log(decleration.specifiers);

  // const file = new Function(source)();

  return output;
}

export const raw = true;
