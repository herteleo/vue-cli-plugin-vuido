const nodemon = require('nodemon');
const path = require('path');

module.exports = (api, options) => {
  const { build } = api.service.commands;

  const buildOpts = { ...build.opts.options };
  const buildFn = build.fn;

  delete buildOpts['--modern'];
  delete buildOpts['--mode'];
  delete buildOpts['--target'];
  delete buildOpts['--formats'];
  delete buildOpts['--name'];
  delete buildOpts['--filename'];
  delete buildOpts['--watch'];

  api.registerCommand(
    'serve',
    {
      description: 'start development',
      usage: 'vue-cli-service serve [options] [entry|pattern]',
      options: buildOpts,
    },
    async (args) => {
      const buildArgs = args;

      buildArgs.watch = true;
      buildArgs.mode = 'development';

      await buildFn(buildArgs);

      const entryFile = path.join(
        process.cwd(),
        args.dest || options.outputDir,
        'app.js',
      );

      nodemon({
        script: entryFile,
        watch: entryFile,
      });

      nodemon.on('start', () => {
        console.log('Vuido app is starting...');
      }).on('restart', () => {
        console.log('Vuido app is restarting...');
      });
    },
  );
};
