import * as Koa from 'koa';

import { isDev, port } from '../config';

import * as KoaRouter from 'koa-router';

import * as favicon from 'koa-favicon';

import * as path from 'path';

import * as compress from 'koa-compress';

import webpackDevServer from '../webpack/webpack-dev-server';

const app = new Koa();
const router = new KoaRouter();

router.get('/*', (ctx: Koa.Context, next) => { // 配置一个简单的get通配路由
  ctx.type = 'html';
  ctx.body = `
    <!DOCTYPE html>
    <html lang="zh-cn">
      <head>
        <title>react-app</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="/assets/vendor.js"></script>
        <script src="/assets/client.js"></script>
      </body>
    </html>
  `;
  next();
});

if (isDev) {
  webpackDevServer(app); // 仅在开发环境使用
}

app.use(compress()); // 压缩处理

app.use(favicon(path.join(__dirname, '../../public/favicon.ico'))); // favicon处理

app.use(router.routes())
   .use(router.allowedMethods()); // 路由处理

app.listen(port, () => {
    console.log(`Koa app started at port ${port}`);
});
