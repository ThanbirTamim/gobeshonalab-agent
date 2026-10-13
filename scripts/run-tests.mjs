#!/usr/bin/env node
// Portable test runner.
//
// `node --test "<glob>"` only expands glob patterns on Node 21+. To support the
// advertised engines range (Node >= 18) we enumerate the compiled test files
// ourselves and pass explicit paths to the test runner, which every supported
// Node version understands.
import { readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const dir = join('dist-tests', 'tests');

if (!existsSync(dir)) {
  console.error(`Test build directory not found: ${dir}. Run "npm run test:build" first.`);
  process.exit(1);
}

const files = readdirSync(dir)
  .filter((f) => f.endsWith('.test.js'))
  .sort()
  .map((f) => join(dir, f));

if (files.length === 0) {
  console.error(`No compiled test files (*.test.js) found in ${dir}.`);
  process.exit(1);
}

const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error);
  process.exit(1);
}
process.exit(result.status ?? 1);
