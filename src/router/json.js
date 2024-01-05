export function GET(req, res) {
  const data = { message: "This is a JSON GET response" };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

export function POST(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedBody = JSON.parse(body);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(parsedBody));
  });
}

export function OPTIONS(req, res) {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end();
}
