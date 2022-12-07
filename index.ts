import Router from "./src/utils/renderPageBLock";

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname!;
  const router = Router("#root");
  router(path);
});
