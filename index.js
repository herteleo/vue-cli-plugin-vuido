const VuidoTemplateCompiler = require('vuido-template-compiler');
const webpack = require('webpack');
const buildCommand = require('./commands/build');
const serveCommand = require('./commands/serve');

module.exports = (api, options) => {
  const vueConfig = api;
  const vueOptions = options;

  vueOptions.filenameHashing = false;

  vueConfig.chainWebpack((webpackConfig) => {
    webpackConfig.output.filename('app.js');
    webpackConfig.optimization.delete('splitChunks');

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

  serveCommand(api, options);
  buildCommand(api, options);
};
