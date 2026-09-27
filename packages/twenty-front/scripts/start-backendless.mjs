import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { delimiter, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const environment = {
  ...process.env,
  PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH ?? ''}`,
  NODE_OPTIONS: process.env.NODE_OPTIONS ?? '--max-old-space-size=8192',
  REACT_APP_SPRING_BACKENDLESS: 'true',
};
const vite = resolve(root, 'node_modules/vite/bin/vite.js');
const run = (command, args, directory) => {
  const result = spawnSync(command, args, {
    cwd: resolve(root, 'packages', directory),
    env: environment,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
};
const build = (directory, artifact, args = []) => {
  if (!existsSync(resolve(root, 'packages', directory, artifact))) {
    run(process.execPath, [vite, 'build', ...args], directory);
  }
};
build('twenty-shared', 'dist/utils.mjs');
if (
  !existsSync(resolve(root, 'packages/twenty-shared/dist/utils/index.d.ts'))
) {
  run(
    resolve(root, 'node_modules/.bin/tsgo'),
    [
      '-p',
      'tsconfig.lib.json',
      '--declaration',
      '--emitDeclarationOnly',
      '--noEmit',
      'false',
      '--outDir',
      'dist',
      '--rootDir',
      'src',
    ],
    'twenty-shared',
  );
  run(
    resolve(root, 'node_modules/.bin/tsc-alias'),
    ['-p', 'tsconfig.lib.json', '--outDir', 'dist'],
    'twenty-shared',
  );
}
build('twenty-ui', 'dist/display.mjs');
build('twenty-sdk', 'dist/front-component-renderer.mjs', [
  '-c',
  'vite.config.browser.ts',
]);
build('twenty-front-component-renderer', 'dist/index.mjs');
if (process.argv.includes('--prepare-only')) process.exit(0);

const server = spawn(
  process.execPath,
  [
    vite,
    '--host',
    '127.0.0.1',
    '--port',
    process.env.PORT ?? process.env.REACT_APP_PORT ?? '3001',
    '--strictPort',
    ...process.argv.slice(2),
  ],
  {
    cwd: resolve(root, 'packages/twenty-front'),
    env: environment,
    stdio: 'inherit',
  },
);
for (const signal of ['SIGINT', 'SIGTERM'])
  process.on(signal, () => server.kill(signal));
server.on('exit', (code) => process.exit(code ?? 0));
server.on('error', (error) => {
  console.error(error.message);
  process.exit(1);
});
