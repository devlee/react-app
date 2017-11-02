import * as Koa from 'koa';

import * as webpack from 'webpack';

import koaWebpackDevMiddleware from './koa-webpack-dev-middleware';

import webpackClientConfig from './client';

import webpackServerConfig from './server';

export default (app: Koa, serverCompilerDone) => {
  const clientDevConfig = webpackClientConfig.development;
  const serverDevConfig = webpackServerConfig.development;
  const clientCompiler = webpack(clientDevConfig);
  clientCompiler.plugin('done', () => {
    const serverCompiler = webpack(serverDevConfig);
    serverCompiler.plugin('done', serverCompilerDone);
    serverCompiler.run((err, stats) => {
      if (err) {
        console.error(stats);
      }
    });
  });
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
