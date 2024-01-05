export function GET(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("This is a FormData GET response");
}

export function POST(req, res) {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const data = Buffer.concat(body).toString();

    const formData = new FormData();
    formData.append("receivedData", data);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(formData.get("receivedData"));
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
