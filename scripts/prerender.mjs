import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
const { render } = await import(path.join(serverDir, "entry-server.js"));

const routes = [
  "/",
  "/work",
  "/work/governed-ai-finance-workspace",
  "/work/auditable-billing-workflow",
  "/work/enterprise-document-knowledge",
  "/work/connected-customer-journey",
  "/philosophy",
  "/about",
  "/contact",
  "/resume",
];

for (const route of routes) {
  const appHtml = render(route);
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );
  const outPath =
    route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerendered ${route} -> ${path.relative(root, outPath)}`);
}
