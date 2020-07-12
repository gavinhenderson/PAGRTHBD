const recursiveReadDir = require("recursive-readdir");
const { Stats } = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// TODO Make this faster by not going through node modules or dist, use gitignore?
const ignoreFunc = (filenamePattern) => (file, stats) => {
  if (stats.isDirectory()) {
    return false;
  }
  return !file.includes(filenamePattern);
};

const getFunctions = async (workingDir, filenamePattern) => {
  const backendFiles = await recursiveReadDir(workingDir, [
    ignoreFunc(filenamePattern),
  ]);
  let backendFuctions = {};

  for (let file of backendFiles) {
    backendFuctions[path.basename(file)] = require(file);
  }

  return backendFuctions;
};

const setupServer = async ({
  workingDir = process.cwd(),
  filenamePattern = "backend.js",
  context = {},
}) => {
  const backendFuctions = await getFunctions(workingDir, filenamePattern);

  const middleware = (route, app) => {
    const corsMiddleware = cors();
    const jsonParser = bodyParser.json();

    app.use(route, corsMiddleware);
    app.use(route, jsonParser);
  };

  const requestHandler = async (req, res) => {
    const { basePath, funcName, params } = req.body;

    const file = backendFuctions[basePath];
    const calledFunction = file[funcName];
    const returnValue = await calledFunction(context)(...params);
    res.send({ returnValue });
  };

  return {
    middleware,
    requestHandler,
  };
};

module.exports = setupServer;
