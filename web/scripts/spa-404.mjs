// Postbuild: copy dist/index.html -> dist/404.html so GitHub Pages serves the
// SPA for unknown paths (deep links like /divisions/property work on refresh).
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
console.log('Created dist/404.html (SPA fallback for GitHub Pages)');
