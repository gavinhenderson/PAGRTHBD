import { helloWorld } from "./test.backend.js";

(async () => {
  const result = await helloWorld("Yo param", "second param");
  console.log({ result });
})();
