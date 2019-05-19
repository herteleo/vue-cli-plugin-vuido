const VuidoTemplateCompiler = require('vuido-template-compiler');
const webpack = require('webpack');

module.exports = (api) => {
  const vueConfig = api;

  vueConfig.chainWebpack((webpackConfig) => {
    webpackConfig.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((loaderOptions) => {
        const config = loaderOptions;

        config.compiler = VuidoTemplateCompiler;
        return config;
      });
  });

  vueConfig.configureWebpack(() => ({
    target: 'node',
    plugins: [
      new webpack.ExternalsPlugin(
        'commonjs',
        ['libui-node'],
      ),
    ],
  }));
};
