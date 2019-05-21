const cosmiconfig = require('cosmiconfig');
const os = require('os');
const packager = require('launchui-packager');

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

  buildOpts['--platform'] = 'specify the platform of the package';

  api.registerCommand(
    'build',
    {
      description: 'pack your app',
      usage: 'vue-cli-service build [options] [entry|pattern]',
      options: buildOpts,
    },
    async (args) => {
      const buildArgs = args;

      buildArgs.watch = false;
      buildArgs.mode = 'production';

      await buildFn(buildArgs);

      const { name, version } = api.service.pkg;
      const platform = args.platform || os.platform();

      const explorer = cosmiconfig('vuido');

      const configResult = await explorer.search();

      let config = {
        name,
        version,
        entry: `./${args.dest || options.outputDir}/app.js`,
        out: './packages',
        platform,
      };

      if (configResult && !configResult.isEmpty) {
        config = {
          ...config,
          ...configResult.config.general,
          ...configResult.config[platform],
        };
        console.log(`Custom Vuido config found at '${configResult.filepath}'...`);
      } else {
        console.log('No custom Vuido config found...');
      }

      console.log('Creating Vuido package with the following config...');
      console.log(config);

      packager(config, (err, outPath) => {
        if (err) throw new Error(err);

        console.log('Vuido package successfully created...');
        console.log(outPath);
      });
    },
  );
};
