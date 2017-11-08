import * as path from 'path';

import * as webpack from 'webpack';

import { cloneDeep } from 'lodash'; // lodash提供的深度复制方法cloneDeep

// 客户端+服务端全环境公共配置baseConfig，项目根目录路径baseDir
// 获取postCssRule的方法getPostCssRule，获取tsRule的方法getTsRule
import baseConfig, { baseDir, getPostCssRule, getTsRule } from './base';

const clientBaseConfig: webpack.Configuration = cloneDeep(baseConfig); // 客户端全环境公共配置

clientBaseConfig.entry = { // 入口属性配置
  client: [ // 打包成client.js
    './src/client/index.tsx', // 客户端入口文件
  ],
  vendor: [ // 打包成vendor.js
    'react',
    'react-dom',
  ],
};

const clientDevConfig: webpack.Configuration = cloneDeep(clientBaseConfig); // 客户端开发环境配置

((clientDevConfig.entry as any).client as string[]).unshift(
  'webpack-hot-middleware/client',
); // 热重载配置
((clientDevConfig.entry as any).vendor as string[]).unshift(
  'react-hot-loader/patch',
); // 热重载配置
clientDevConfig.cache = false; // 禁用缓存
clientDevConfig.output.filename = '[name].js'; // 直接使用源文件名作为打包后文件名

const tsRule = getTsRule('./src/webpack/tsconfig.client.json');
(tsRule.use as object[]).unshift({
  loader: 'react-hot-loader/webpack',
});
(clientDevConfig.module as webpack.NewModule).rules.push(
  tsRule,
  getPostCssRule({
    loader: 'style-loader',
  }),
);
clientDevConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(), // 热重载配置
  new webpack.optimize.CommonsChunkPlugin({ // 提取公共代码到vendor.js中去
    filename: 'vendor.js',
    name: 'vendor',
  }),
  new webpack.NoEmitOnErrorsPlugin(), // 编译出错时跳过输出阶段，以保证输出的资源不包含错误。
);

const clientProdConfig: webpack.Configuration = cloneDeep(clientBaseConfig); // 客户端生产环境配置

// TODO 客户端生产环境配置暂不处理和使用

export default {
  development: clientDevConfig,
  production: clientProdConfig,
};
