const { config } = require('@app/omni/config');
config('');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { getBundleJson } = require('@app/web/var/get-bundle-json');
const express = require('express');
const https = require('https');
const yargs = require('yargs');
const { paths } = require('@app/web/var/paths');
const { getAppInfo } = require('@sotaoi/omni/get-app-info');

let serverInitInterval = null;

const appInfo = getAppInfo();

const main = async () => {
  const argv = yargs
    .option('info', {
      alias: 'i',
      description: 'File path for app info json file',
      type: 'string',
    })
    .help()
    .alias('help', 'h').argv;
  if (!argv.servebuild) {
    throw new Error('--servebuild is required (--servebuild yes / --servebuild no)');
  }
  let serverInitTries = 0;
  let bundleInstallInterval = null;
  const PORT = '8080';
  const HOST = '0.0.0.0';
  clearTimeout(serverInitInterval);
  const keyPath = path.resolve(appInfo.sslKey);
  const certPath = path.resolve(appInfo.sslCert);
  const chainPath = path.resolve(appInfo.sslCa);
  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath) || !fs.existsSync(chainPath)) {
    if (serverInitTries === 60) {
      console.error('server failed to start because at least one ssl certificate file is missing');
      return;
    }
    serverInitTries++;
    console.warn('at least one certificate file is missing. retrying in 5 seconds...');
    serverInitInterval = setTimeout(async () => {
      await main();
    }, 5000);
    return;
  }

  // PROD

  if (argv.servebuild === 'yes') {
    const app = express();
    app.use((req, res, next) => {
      if (req.url === '/') {
        return next();
      }
      return express.static(paths().clientBuild)(req, res, next);
    });
    app.get('*', function (req, res) {
      res.sendFile(path.resolve(paths().clientBuild, 'index.html'));
    });
    const server = https
      .createServer(
        {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
          ca: fs.readFileSync(chainPath),
          rejectUnauthorized: false,
        },
        app,
      )
      .listen(PORT);
    !getBundleJson().installed &&
      (bundleInstallInterval = setInterval(() => {
        const BundleJson = getBundleJson();
        if (!BundleJson.installed) {
          return;
        }
        clearInterval(bundleInstallInterval);
        server.close();
        setTimeout(main, 3000);
      }, 3000));
    return;
  }

  // DEV

  const { WebpackConfigFactory } = require('@app/web/var/webpack.config');

  const config = WebpackConfigFactory('development');
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, {
    sockPort: PORT,
    compress: false,
    contentBase: paths().publicPath,
    watchContentBase: true,
    publicPath: '/',
    watchOptions: {
      ignored: [path.resolve('./node_modules'), path.resolve('./../app-client/sdk')],
      poll: true,
    },
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
      ca: fs.readFileSync(chainPath),
    },
    host: HOST,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    public: '0.0.0.0',
    disableHostCheck: true,
  });
  devServer.listen(parseInt(PORT), HOST);
  !getBundleJson().installed &&
    (bundleInstallInterval = setInterval(() => {
      const BundleJson = getBundleJson();
      if (!BundleJson.installed) {
        return;
      }
      clearInterval(bundleInstallInterval);
      devServer.close();
      setTimeout(main, 3000);
    }, 3000));
};

main();
