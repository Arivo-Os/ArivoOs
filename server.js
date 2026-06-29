const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
};

const server = http.createServer((req, res) => {
  // Parse URL to ignore query strings and hashes
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let cleanPath = decodeURIComponent(parsedUrl.pathname);

  // Prevent directory traversal
  const safePath = path.normalize(cleanPath).replace(/^(\.\.[\/\\])+/, "");
  let filePath = path.join(PUBLIC_DIR, safePath);

  // If path is a directory, serve index.html inside it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  // Handle Next.js clean URLs (e.g. /about or /about/ -> /about/index.html)
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    // Check if it's meant to be a folder with index.html
    const indexHtmlPath = path.join(filePath, "index.html");
    if (fs.existsSync(indexHtmlPath)) {
      filePath = indexHtmlPath;
    } else {
      // Check if it's /about.html or /about/index.html
      const directHtmlPath = filePath + ".html";
      if (fs.existsSync(directHtmlPath)) {
        filePath = directHtmlPath;
      }
    }
  }

  // If still not found, check for a 404 page
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    const errorPage = path.join(PUBLIC_DIR, "404/index.html");
    if (fs.existsSync(errorPage)) {
      filePath = errorPage;
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }
  } else {
    res.writeHead(200);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  res.setHeader("Content-Type", contentType);

  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");

  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}/`);
  console.log(`Serving static files from: ${PUBLIC_DIR}`);
});
