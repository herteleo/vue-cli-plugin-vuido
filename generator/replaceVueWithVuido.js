const fs = require('fs');
const { EOL } = require('os');

module.exports = (api) => {
  const fileContents = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });
  const fileLines = fileContents.split(/\r?\n/g);

  const lineIndex = fileLines.findIndex(line => line.match(/import Vue from/));
  const line = fileLines[lineIndex];

  fileLines[lineIndex] = line.replace(/vue/, 'vuido');

  fs.writeFileSync(api.entryFile, fileLines.join(EOL), { encoding: 'utf-8' });
};
