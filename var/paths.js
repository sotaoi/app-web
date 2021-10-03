const path = require('path');
const fs = require('fs');

const paths = () => {
  const rootPath = fs.realpathSync(path.resolve(process.cwd(), '../'));
  const resolveRoot = (relativePath) => path.resolve(rootPath, relativePath);

  return {
    webMain: resolveRoot('./app-web/main.tsx'),
    clientBuild: resolveRoot('./app-web/var/build'),
    clientTmpBuild: resolveRoot('./app-web/var/tmp.build'),
    publicPath: resolveRoot(`./app-web/var/public`),
    clientHtml: resolveRoot('./app-web/var/index.html'),
    appWebPath: resolveRoot('./app-web'),
    appClientPath: resolveRoot('./app-client'),
    appOmniPath: resolveRoot('./app-omni'),
    sotaoiClientPath: resolveRoot('./packages/sotaoi-client'),
    sotaoiOmniPath: resolveRoot('./packages/sotaoi-omni'),
  };
};

module.exports = { paths };
