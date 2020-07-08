// chalk — colorizes the output
// clear — clears the terminal screen
// clui — draws command-line tables, gauges and spinners
// figlet — creates ASCII art from text
// inquirer — creates interactive command-line user interface
// minimist — parses argument options
// configstore — easily loads and saves config without you having to think about where and how.
// console.log("PWD");

import figlet, { Options as FigletOptions } from "figlet";
import { cyan, blueBright, red, green, cyanBright } from "chalk";
import setupServer from "./server";
import minimist, { ParsedArgs } from "minimist";
import getFunctions from "./get-functions";
import { BackendFunctions } from "./types";
import Table from "cli-table3";

const log = console.log;

const figletPromisify = (asciiArtString: string, options: FigletOptions) => {
  return new Promise((res, rej) => {
    figlet(asciiArtString, options, (err, result) => {
      if (err) return rej(err);
      return res(result);
    });
  });
};

type Options = {
  port: number;
  environment: string;
  path: string;
  extension: string;
};

const getOptions = (args: ParsedArgs): Options => {
  const port: number = args.port || 9000;
  const environment: string = args.environment || "dev";
  const path: string = args.path || process.cwd();
  const extension: string = args.extension || "backend.js";

  return { port, environment, path, extension };
};

const logOptions = ({ port, environment, path, extension }: Options) => {
  log(cyan("Port number: " + port));
  log(cyan("Environment: " + environment));
  log(cyan("Backend path: " + path));
  log(cyan("Backend files extension: *." + extension));

  log();
};

const logFunctions = (functions: BackendFunctions) => {
  const table = new Table({
    head: ["filename", "has default", "named exports"],
  });

  // TODO Make this way less hacky
  const tableRows = Object.keys(functions).map((filename) => [
    filename,
    !!functions[filename].default.toString(),
    Object.keys(functions[filename])
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

  const args = minimist(process.argv.slice(2));
  const options = getOptions(args);
  logOptions(options);

  const functions = await getFunctions(options.path, options.extension);

  logFunctions(functions);

  const app = await setupServer(functions);

  app.listen(options.port, () =>
    log(
      blueBright(`Example app listening at `) +
        cyanBright(`http://localhost:${options.port} 🚀`)
    )
  );
})();
