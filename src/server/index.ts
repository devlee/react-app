import * as Koa from 'koa';

import serverConfig from './config';

const app = new Koa();

const { port } = serverConfig;

app.use((ctx: Koa.Context, next) => {
  ctx.body = 'hello world';
  next();
});

app.listen(port, () => {
  console.log(`Koa app started at port ${port}`);
});
