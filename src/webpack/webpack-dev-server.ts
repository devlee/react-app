import * as Koa from 'koa';

import * as webpack from 'webpack';

import koaWebpackDevMiddleware from './koa-webpack-dev-middleware';

import webpackClientConfig from './client';

export default (app: Koa) => {
  const clientDevConfig = webpackClientConfig.development;
  const clientCompiler = webpack(clientDevConfig);
  const { output } = clientDevConfig;
  const devMiddlewareOptions = {
    publicPath: output.publicPath,
    stats: {
      chunks: false,
      colors: true,
    },
  };

  app.use(koaWebpackDevMiddleware(clientCompiler, devMiddlewareOptions));
};
