const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const STATIC = "./dist";

app.use(express.static(STATIC));

app.listen(PORT, function () {
  console.log(`
    Example app listening on port ${PORT}!
    Root dirname ${__dirname}
  `);
});
