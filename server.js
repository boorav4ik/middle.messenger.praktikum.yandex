const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const STATIC = `${__dirname}/dist`;

app.use(express.static(STATIC));

app.get('*', (_, res) => {
  res.send(`${STATIC}/index.html`);
});

app.listen(PORT, () => {
  console.log(`
    Example app listening on port ${PORT}!
    Static dirname ${STATIC}
  `);
});
