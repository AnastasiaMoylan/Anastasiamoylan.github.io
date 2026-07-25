import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./app/App";

export { getPageMeta } from "./data/pageMeta";
export { prerenderRoutes, buildSitemap } from "./data/routes";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
