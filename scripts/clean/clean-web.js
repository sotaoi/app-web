#!/bin/env node

const fs = require('fs');
const path = require('path');
const { paths } = require('@app/web/var/paths');

const main = async () => {
  fs.rmdirSync(paths().clientBuild, { recursive: true });
  fs.rmdirSync(paths().clientTmpBuild, { recursive: true });
  fs.mkdirSync(paths().clientBuild);
  fs.writeFileSync(path.resolve(paths().clientBuild, '.gitkeep'), '');

  console.info(`Web build folders have been cleaned\n`);
};

main();
