import path from "path";
import { default as express, Request, Response } from "express";

const PORT = 3000;
const WORKING_DIR = path.join(__dirname, "../example");

const app = express();

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
