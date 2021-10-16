const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { paths } = require('@app/web/var/paths');
const { envVarWhitelist } = require('@sotaoi/omni/env-var-whitelist');
const { getBundleJson } = require('@app/web/var/get-bundle-json');
const { mockList } = require('@app/web/var/mock-list');

const alias = {
  react: path.resolve('./node_modules/react'),
  'react-dom': path.resolve('./node_modules/react-dom'),
  redux: path.resolve('./node_modules/redux'),
  'react-redux': path.resolve('./node_modules/react-redux'),
};
mockList.map((mockItem) => (alias[mockItem] = path.resolve('./var/generic-mock')));

const WebpackConfigFactory = (webpackEnv) => {
  process.env.NODE_ENV = webpackEnv;
  process.env.SIGNATURE_1 = process.env.DB_NAME;
  process.env.SIGNATURE_2 = process.env.DB_CONTROL_PANEL_NAME;
  process.env.BUNDLE_INSTALLED = getBundleJson().installed ? 'yes' : 'no';
  const envVars = {};
  envVarWhitelist.map((varName) => (envVars[varName] = process.env[varName]));

  const isEnvProduction = process.env.NODE_ENV !== 'development';
  const minimizeFlag = !!isEnvProduction;
  return {
    mode: isEnvProduction ? 'production' : 'development',
    devtool: 'source-map',
    entry: paths().webMain,
    output: {
      path: paths().clientBuild,
      publicPath: '/',
    },
    // devServer: {
    //   contentBase: paths().publicPath,
    // },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(tsx|ts|js)$/,
          include: [paths().appWebPath, paths().appClientPath, paths().sotaoiClientPath, paths().sotaoiOmniPath],
          loader: require.resolve('ts-loader'),
          exclude: [/build/, /deployment/, /node_modules/, /var/],
          options: {
            configFile: path.resolve('tsconfig.json'),
          },
        },
      ],
    },
    resolve: {
      alias,
      extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
      minimize: minimizeFlag,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ],
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        inject: true,
        template: paths().clientHtml,
        isEnvProduction,
        // minify: minimizeFlag
        //   ? {
        //       removeComments: false,
        //       collapseWhitespace: false,
        //       removeRedundantAttributes: false,
        //       useShortDoctype: false,
        //       removeEmptyAttributes: false,
        //       removeStyleLinkTypeAttributes: false,
        //       keepClosingSlash: true,
        //       minifyJS: false,
        //       minifyCSS: false,
        //       minifyURLs: false,
        //     }
        //   : {
        //       //
        //     },
        minify: false,
      }),
      new webpack.DefinePlugin({
        __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
        'process.env': JSON.stringify(JSON.stringify(envVars)),
      }),
    ],
  };
};

export { WebpackConfigFactory };
