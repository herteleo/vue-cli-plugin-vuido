const replaceVueWithVuido = require('./replaceVueWithVuido');
const replaceMountCall = require('./replaceMountCall');

module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      vuido: '^0.2.0',
    },
  });

  api.onCreateComplete(() => {
    replaceVueWithVuido(api);
    replaceMountCall(api);
  });
};
