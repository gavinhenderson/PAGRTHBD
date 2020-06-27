import { parseExports } from "./parse-exports";
import generateLoaderContent from "./generate-loader-content";
import loaderContent from "./loader-content";

export default function (source: Buffer) {
  const exportDefinitions = parseExports(source.toString());
  const output = generateLoaderContent(
    loaderContent.toString(),
    exportDefinitions
  );

  return output.join("\n");
}

export const raw = true;
