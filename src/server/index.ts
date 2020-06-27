import path from "path";
import { default as express, Request, Response } from "express";
import recursiveReadDir from "recursive-readdir";
import { Stats } from "fs";

// TODO Make this configurable
const WORKING_DIR = path.join(__dirname, "../../example");
const PORT = 3000;

// TODO Make this faster by not going through node modules or dist
// TODO Make backend.js configurable
const ignoreFunc = (file: string, stats: Stats) => !file.includes("backend.js");

type BackendFunctions = {
  [key: string]: {
    [key: string]: Function;
  };
};

(async () => {
  // TODO this section should really be its own tested thing
  const backendFiles = await recursiveReadDir(WORKING_DIR, [ignoreFunc]);
  let backendFuctions: BackendFunctions = {};

  for (let file of backendFiles) {
    backendFuctions[path.basename(file)] = require(file);
  }

  const app = express();

  app.get("/", (req: Request, res: Response) => res.send("Hello World!"));

  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
})();
