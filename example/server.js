const setupServer = require("server");
const express = require("express");

const app = express();
const port = 3000;

(async () => {
  const { middleware, requestHandler } = await setupServer({
    context: { test: "test" },
  });

  middleware("/api/function", app);
  app.post("/api/function", requestHandler);

  app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );
})();
