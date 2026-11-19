import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
const run = (c) => execSync(c, { stdio: 'inherit', cwd: '../twenty-sdk' });
rmSync('../twenty-sdk/dist', { recursive: true, force: true });
for (const n of ['node', 'define', 'billing', 'front-component', 'logic-function', 'utils', 'browser']) {
  run(`yarn exec vite build -c vite.config.${n}.ts`);
}
