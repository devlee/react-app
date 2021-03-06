import * as Koa from 'koa';

import * as webpack from 'webpack';

import * as webpackHotMiddleware from 'webpack-hot-middleware';

import * as stream from 'stream';

export default (compiler: webpack.Compiler, opts?: webpackHotMiddleware.Options) => {
  const hotMiddleware = webpackHotMiddleware(compiler, opts);

  const koaWebpackHotMiddleware = (ctx: Koa.Context, next: () => Promise<any>): any => {
    const streamer = new stream.PassThrough();
    ctx.body = streamer;
    const res: any = {};
    res.write = streamer.write.bind(streamer);
    res.writeHead = (state: number, headers?: any) => {
      ctx.state = state;
      ctx.set(headers);
    };
    res.end = () => {}
    return hotMiddleware(ctx.req, res, next);
  };

  (koaWebpackHotMiddleware as any).hotMiddleware = hotMiddleware;

  return koaWebpackHotMiddleware;
};
