import recursiveReadDir from "recursive-readdir";
import { Stats } from "fs";
import { BackendFunctions } from "./types";
import path from "path";

// TODO Make this faster by not going through node modules or dist, use gitignore?
const ignoreFunc = (filenamePattern: string) => (
  file: string,
  stats: Stats
) => {
  if (stats.isDirectory()) {
    return false;
  }
  return !file.includes(filenamePattern);
};

const getFunctions = async (workingDir: string, filenamePattern: string) => {
  const backendFiles = await recursiveReadDir(workingDir, [
    ignoreFunc(filenamePattern),
  ]);
  let backendFuctions: BackendFunctions = {};

  for (let file of backendFiles) {
    backendFuctions[path.basename(file)] = require(file);
  }

  return backendFuctions;
};

export default getFunctions;
