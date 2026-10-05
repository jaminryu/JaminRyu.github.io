import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { locales } from '../content.mjs';
import { renderPage } from './render-page.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = root + "";
await mkdir(output, { recursive: true });
await writeFile(output + 'index.html', renderPage({ locales }));
console.log('Rendered English, Japanese, and Chinese from the saved draft.');
