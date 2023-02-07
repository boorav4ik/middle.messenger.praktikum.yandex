const express = require("express");
const history = require("express-history-api-fallback");

const app = express();
const PORT = process.env.PORT || 3000;
const STATIC = `${__dirname}/dist`;

app.use(express.static(STATIC));
app.use(history("index.html", { root: STATIC }));

app.listen(PORT, () => {
  console.log(`
    Example app listening on port ${PORT}!
    Static dirname ${STATIC}
  `);
});
