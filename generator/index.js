const replaceVueWithVuido = require('./replaceVueWithVuido');
const replaceMountCall = require('./replaceMountCall');

module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      vuido: '^0.2.0',
    },
  });

  api.onCreateComplete(() => {
    replaceVueWithVuido(api);
    replaceMountCall(api);
  });

  if (options.setupVuidoExamples) {
    api.render('./templates/base');
  }
};
