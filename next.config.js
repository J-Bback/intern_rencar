const webpack = require('webpack');

const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");

module.exports = withCSS(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    }, {
      test: /\.md$/,
      use: [
        {
          loader: 'markdown-with-front-matter-loader',
        },
      ],
    });

    // config.plugins.push(new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //   'process.env.API_ENV': JSON.stringify(process.env.API_ENV),
    //   'process.env.apiBaseUrl': apiBaseUrl,
    //   'process.env.cookieDomain': cookieDomain,
    //   'process.env.carApiBaseUrl': carApiBaseUrl,
    // }));
    return config;
  }
}));
