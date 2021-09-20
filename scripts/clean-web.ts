import fs from 'fs';
import path from 'path';

const { paths } = require('@app/web/var/paths');

const main = async (): Promise<void> => {
  fs.rmdirSync(paths().clientBuild, { recursive: true });
  fs.rmdirSync(paths().clientTmpBuild, { recursive: true });
  fs.mkdirSync(paths().clientBuild);
  fs.writeFileSync(path.resolve(paths().clientBuild, '.gitkeep'), '');

  console.info(`Web build folders have been cleaned\n`);
};

main();
