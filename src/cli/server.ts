import path from "path";
import { default as express, Request, Response } from "express";
import recursiveReadDir from "recursive-readdir";
import { Stats } from "fs";
import bodyParser from "body-parser";
import cors from "cors";

// TODO Make this configurable
const WORKING_DIR = path.join(__dirname, "../../example");

// TODO Make this faster by not going through node modules or dist
// TODO Make backend.js configurable
const ignoreFunc = (file: string, stats: Stats) => !file.includes("backend.js");

type BackendFunctions = {
  [key: string]: {
    [key: string]: Function;
  };
};

const setupServer = async (backendFuctions: BackendFunctions) => {
  const app = express();
  const jsonParser = bodyParser.json();

  app.use(cors());
  app.post("/api/function", jsonParser, async (req: Request, res: Response) => {
    const { basePath, funcName, params } = req.body;

    const file = backendFuctions[basePath];
    const calledFunction = file[funcName];
    const returnValue = await calledFunction(...params);
    res.send({ returnValue });
  });

  return app;
};

export default setupServer;
