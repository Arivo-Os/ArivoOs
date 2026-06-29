const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, "out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

const server = http.createServer((req, res) => {
  // Parse URL to ignore query strings and hashes
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let cleanPath = decodeURIComponent(parsedUrl.pathname);

  // Prevent directory traversal
  const safePath = path.normalize(cleanPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(PUBLIC_DIR, safePath);

  // If path is a directory, serve index.html inside it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  // Handle Next.js clean URLs (e.g. /about or /about/ -> /about/index.html)
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    const indexHtmlPath = path.join(filePath, "index.html");
    if (fs.existsSync(indexHtmlPath)) {
      filePath = indexHtmlPath;
    } else {
      const directHtmlPath = filePath + ".html";
      if (fs.existsSync(directHtmlPath)) {
        filePath = directHtmlPath;
      }
    }
  }

  // Serve 404 page if file not found
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    const errorPage = path.join(PUBLIC_DIR, "404", "index.html");
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
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Fix Google Sign-In popup communication.
  // Chrome blocks window.postMessage from OAuth popups when COOP is "same-origin".
  // "same-origin-allow-popups" keeps the isolation while allowing the Google popup
  // to send the credential token back to the opener window.
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");

  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}/`);
  console.log(`Serving static files from: ${PUBLIC_DIR}`);
});
