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

const figletPromisify = (asciiArtString: string, options: FigletOptions) => {
  return new Promise((res, rej) => {
    figlet(asciiArtString, options, (err, result) => {
      if (err) return rej(err);
      return res(result);
    });
  });
};

(async () => {
  const data = await figletPromisify("PAGRTHBD", { horizontalLayout: "full" });
  console.log(chalk.red(data));
  console.log(chalk.green("Probably A Good Reason This Hasn't Been Done"));
})();
