// eslint-disable-next-line @typescript-eslint/no-var-requires
const { JSDOM } = require("jsdom");

const { window } = new JSDOM('<body id="root"></body>', {
  url: "http://127.0.0.1:3000"
});

global.window = window;
global.document = window.document;
