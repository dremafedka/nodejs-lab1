export function GET(req, res) {
  const message = "Welcome to the API!";
  const endpoints = [
    { name: "JSON Data", link: "/json" },
    { name: "XML Data", link: "/xml" },
    { name: "FormData", link: "/formdata" },
  ];

  const responseData = {
    message,
    endpoints,
  };

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(responseData, null, 2));
}
