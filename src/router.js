import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = resolve(fileURLToPath(import.meta.url));
const routesPath = resolve(__dirname, "../routes");

export async function route(req, res) {
  const { url, method } = req;
  const path = url.split("/")[1];

  let routeFile;
  switch (path) {
    case "":
      routeFile = "index.js";
      break;
    case "json":
      routeFile = "json.js";
      break;
    case "xml":
      routeFile = "xml.js";
      break;
    case "formdata":
      routeFile = "formdata.js";
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route not found");
      return;
  }

  const filePath = resolve(routesPath, routeFile);
  try {
    const routeModule = await import(filePath);
    routeModule[method.toUpperCase()](req, res);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}
