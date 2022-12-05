const express = require("express");
const fallback = require("express-history-api-fallback");

const app = express();
const PORT = process.env.PORT || 3000;
const STATIC = "./dist";

app.use(express.static(STATIC));

app.use(fallback(`${STATIC}/index.html`, { root: __dirname }));

app.listen(PORT, function () {
  console.log(`
    Example app listening on port ${PORT}!
    Root dirname ${__dirname}
  `);
});
