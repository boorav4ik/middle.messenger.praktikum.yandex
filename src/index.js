import Handlebars from "handlebars";

const template = `
<a href="http://ya.ru">
    Hello, {{ username }}!
</a>
`;
document.addEventListener("DOMContentLoaded", () => {
  const compiled = Handlebars.compile(template); //компиляция шаблона

  const html = compiled({ username: "OLOLO" }); //рендер строки/html

  const root = document.querySelector("#app");
  root.innerHTML = html;
});
