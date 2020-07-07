// chalk — colorizes the output
// clear — clears the terminal screen
// clui — draws command-line tables, gauges and spinners
// figlet — creates ASCII art from text
// inquirer — creates interactive command-line user interface
// minimist — parses argument options
// configstore — easily loads and saves config without you having to think about where and how.
// console.log("PWD");

import figlet, { Options as FigletOptions } from "figlet";
import chalk from "chalk";
import setupServer from "./server";
import minimist, { ParsedArgs } from "minimist";

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

const outputOptions = ({ port, environment, path, extension }: Options) => {
  console.log(chalk.cyan("Port number: " + port));
  console.log(chalk.cyan("Environment: " + environment));
  console.log(chalk.cyan("Backend path: " + path));
  console.log(chalk.cyan("Backend files extension: *." + extension));

  console.log();
};

(async () => {
  const data = await figletPromisify("PAGRTHBD", { horizontalLayout: "full" });
  console.log(chalk.red(data));
  console.log(chalk.green("Probably A Good Reason This Hasn't Been Done"));
  console.log();

  const args = minimist(process.argv.slice(2));
  const options = getOptions(args);
  outputOptions(options);

  const app = await setupServer();

  app.listen(options.port, () =>
    console.log(
      chalk.blueBright(`Example app listening at `) +
        chalk.cyanBright(`http://localhost:${options.port} 🚀`)
    )
  );
})();
