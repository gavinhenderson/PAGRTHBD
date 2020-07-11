import figlet, { Options as FigletOptions } from "figlet";
import { cyan, blueBright, red, green, cyanBright, redBright } from "chalk";
import setupServer from "./server";
import getFunctions from "./get-functions";
import { BackendFunctions } from "./types";
import Table from "cli-table3";
import { Command } from "commander";

const packageJson = require("./package.json");

const log = console.log;

const program = new Command();
program
  .version(packageJson.version)
  .option("--port <number>", "Port to run the server on", "9000")
  .option("--env <string>", "Port to run the server on", "dev")
  .option("--path <string>", "Port to run the server on", process.cwd())
  .option("--fileExtension <>", "Port to run the server on", "backend.js")
  .parse(process.argv);

const figletPromisify = (asciiArtString: string, options: FigletOptions) => {
  return new Promise((res, rej) => {
    figlet(asciiArtString, options, (err, result) => {
      if (err) return rej(err);
      return res(result);
    });
  });
};

const logOptions = ({
  port,
  env,
  path,
  fileExtension,
}: {
  [key: string]: any;
}) => {
  log(cyan("Port number: " + port));
  log(cyan("Environment: " + env));
  log(cyan("Backend path: " + path));
  log(cyan("Backend files extension: *." + fileExtension));

  log();
};

const hasDefaultEmoji = (hasDefault: boolean) => (hasDefault ? "✅" : "❌");

const logFunctions = (functions: BackendFunctions) => {
  const table = new Table({
    head: ["filename", "has default", "named exports"],
  });

  // TODO Make this way less hacky
  const tableRows = Object.keys(functions).map((filename) => [
    filename, // filename
    hasDefaultEmoji(!!functions[filename].default), // has default
    Object.keys(functions[filename]) // named export
      .filter((name) => name !== "default")
      .join(", "),
  ]);

  table.push(...tableRows);

  console.log(table.toString());
  console.log();
};

(async () => {
  const data = await figletPromisify("PAGRTHBD", { horizontalLayout: "full" });
  log(red(data));
  log(green("Probably A Good Reason This Hasn't Been Done"));
  log();
  const functions = await getFunctions(program.path, program.fileExtension);

  // Doesnt find any functions
  if (Object.keys(functions).length === 0) {
    log(
      redBright(
        "No backend files were found to host. Are you sure you are pointing at the right directory with the right extension?"
      )
    );
    log(
      redBright(
        `Files were looked for in the directory '${program.path}' with extension '${program.fileExtension}'`
      )
    );
    process.exit(1);
  }

  logOptions(program);
  logFunctions(functions);

  const app = await setupServer(functions);

  app.listen(program.port, () =>
    log(
      blueBright(`Example app listening at `) +
        cyanBright(`http://localhost:${program.port} 🚀`)
    )
  );
})();
