// Local static server for the production build, with SPA fallback —
// mirrors how GitHub Pages + the generated 404.html behave.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = new URL('./dist', import.meta.url).pathname;
const PORT = process.env.PORT || 4173;
const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
};

createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = join(DIST, path);
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(DIST, 'index.html');
  try {
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(PORT, () => console.log(`Serving dist/ at http://localhost:${PORT}`));
