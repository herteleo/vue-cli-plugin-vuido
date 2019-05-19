const fs = require('fs');
const { EOL } = require('os');

module.exports = (api) => {
  const fileContents = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });
  const fileLines = fileContents.split(/\r?\n/g);

  const lineIndex = fileLines.findIndex(line => line.match(/\$mount/));

  if (lineIndex < 0) return;

  const line = fileLines[lineIndex];
  fileLines[lineIndex] = line.replace(/\$mount.*\)/, '$start()');

  fs.writeFileSync(api.entryFile, fileLines.join(EOL), { encoding: 'utf-8' });
};
