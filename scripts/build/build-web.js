#!/bin/env node

process.env.NODE_ENV = 'production';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { paths } = require('@app/web/var/paths');
const { WebpackConfigFactory } = require('@app/web/var/webpack.config');
const { Helper } = require('@sotaoi/omni/helper');
const Config = require('@sotaoi/config').Config.init(require('@app/omni/env.json'));

const main = async () => {
  // generate configuration
  const config = WebpackConfigFactory('production');

  // delete build folder
  fs.rmdirSync(paths().clientBuild, { recursive: true });
  fs.rmdirSync(paths().clientTmpBuild, { recursive: true });
  fs.mkdirSync(paths().clientBuild);
  fs.writeFileSync(path.resolve(paths().clientBuild, '.gitkeep'), '');

  // build
  const compiler = webpack(config);
  compiler.run((ex, stats) => {
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

    let appInfoJs = '      // template for regeneration\n';
    appInfoJs += '      window.envvars = {\n';
    appInfoJs += '        //\n';
    for (const [key, value] of Object.entries({
      ...Config.dumpEnvVars(),
      SIGNATURE_1: Config.get('DB_NAME'),
      SIGNATURE_2: Config.get('DB_CONTROL_PANEL_NAME'),
      NODE_ENV: 'production',
    })) {
      appInfoJs += `        '${key}': '${value}',\n`;
    }
    appInfoJs += '      };\n';
    const indexHtml = fs.readFileSync(path.resolve(paths().clientBuild, 'index.html')).toString();
    fs.writeFileSync(
      path.resolve(paths().clientBuild, 'index.html'),
      indexHtml.replace('<!-- >> window.envvars << -->', `<script>\n${appInfoJs}    </script>`),
    );

    console.info(`Hash: ${hash}\nBuild time: ${(endTime - startTime) / 1000}s\n`);
  });
};

main();
