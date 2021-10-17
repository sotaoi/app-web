#!/bin/env node

import fs from 'fs';
import path from 'path';
import webpack, { Stats } from 'webpack';

const { paths } = require('@app/web/var/paths');
const { WebpackConfigFactory } = require('@app/web/var/webpack.config');
const { Helper } = require('@sotaoi/omni/helper');

const main = async (): Promise<void> => {
  // generate configuration
  const config = WebpackConfigFactory('production');

  // delete build folder
  fs.rmdirSync(paths().clientBuild, { recursive: true });
  fs.rmdirSync(paths().clientTmpBuild, { recursive: true });
  fs.mkdirSync(paths().clientBuild);
  fs.writeFileSync(path.resolve(paths().clientBuild, '.gitkeep'), '');

  // build
  const compiler = webpack(config);
  compiler.run((ex: Error, stats: Stats) => {
    if (ex) {
      console.info(ex);
      return;
    }

    const { hash, startTime, endTime } = stats;
    if (!endTime || !startTime) {
      console.info(`hash: ${hash}\n`);
      return;
    }

    fs.renameSync(paths().clientBuild, paths().clientTmpBuild);
    Helper.copyRecursiveSync(fs, path, paths().publicPath, paths().clientBuild);
    Helper.copyRecursiveSync(fs, path, paths().clientTmpBuild, paths().clientBuild);
    fs.rmdirSync(paths().clientTmpBuild, { recursive: true });

    console.info(`Hash: ${hash}\nBuild time: ${(endTime - startTime) / 1000}s\n`);
  });
};

main();
