import * as path from 'path';

import * as webpack from 'webpack';

import * as nodeExternals from 'webpack-node-externals';

import { cloneDeep } from 'lodash'; // lodash提供的深度复制方法cloneDeep

// 客户端+服务端全环境公共配置baseConfig，项目根目录路径baseDir
// 获取postCssRule的方法getPostCssRule，获取tsRule的方法getTsRule
import baseConfig, { baseDir, getPostCssRule, getTsRule } from './base';

const serverBaseConfig: webpack.Configuration = cloneDeep(baseConfig); // 服务端全环境公共配置

serverBaseConfig.entry = { // 入口属性配置
  'server-bundle': [
    './src/server/bundle.tsx',
  ],
};
serverBaseConfig.externals = [nodeExternals()],
serverBaseConfig.node = {
  __dirname: true,
  __filename: true,
};
serverBaseConfig.target = 'node';
serverBaseConfig.output.libraryTarget = 'commonjs2';

const serverDevConfig: webpack.Configuration = cloneDeep(serverBaseConfig); // 服务端开发环境配置

serverDevConfig.cache = false; // 禁用缓存
serverDevConfig.output.filename = '[name].js'; // 使用源文件名作为打包后文件名
serverDevConfig.module.rules.push(
  getTsRule('./src/webpack/tsconfig.server.json'),
  getPostCssRule({
    loader: 'isomorphic-style-loader',
  }),
);
serverDevConfig.plugins.push(
  new webpack.NoEmitOnErrorsPlugin(), // 编译出错时跳过输出阶段，以保证输出的资源不包含错误。
);

const serverProdConfig: webpack.Configuration = cloneDeep(serverBaseConfig); // 服务端生产环境配置

// TODO 服务端生产环境配置暂不处理和使用

export default {
  development: serverDevConfig,
  production: serverProdConfig,
};
