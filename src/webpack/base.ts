import * as path from 'path';

import * as webpack from 'webpack';

export const baseDir = path.resolve(__dirname, '../..'); // 项目根目录

export const getTsRule = (configFileName) => ({ // 传入tsconfig配置文件返回rule
  test: /\.tsx?$/,
  use: [
    {
      loader: 'awesome-typescript-loader',
      options: {
        configFileName, // 指定at-loader使用的tsconfig文件
      },
    },
  ],
});

export const getPostCssRule = (styleLoader) => ({
  test: /\.pcss$/,
  use: [
    styleLoader,
    {
      loader: 'css-loader',
      options: {
        localsConvention: 'camelCase',
        modules: {
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('postcss-import')({
            path: path.join(baseDir, './src/client/style'),
          }),
          require('postcss-cssnext'),
          require('postcss-nested'),
          require('postcss-functions')({
            functions: {
              x2(v, u) {
                return v * 2 + (u ? u : 'px');
              },
            },
          }),
        ],
      },
    },
  ],
});

const baseConfig: webpack.Configuration = { // 客户端+服务端全环境公共配置baseConfig
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [],
  },
  output: {
    path: path.resolve(baseDir, './bundle'), // 输出打包文件至项目根目录下的bundle目录中去
    publicPath: '/assets/', // 打包出的资源文件引用的目录，比如在html中引用a.js，src为'/assets/a.js'
  },
  plugins: [],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'], // 用于webpack查找文件时自行补全文件后缀
  },
};

export default baseConfig;
