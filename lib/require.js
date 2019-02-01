const resolve = require('resolve');
const { dirname } = require('path');

const { error } = console;

function localRequire(name, path) {
  const basedir = dirname(path);
  try {
    const resolved = resolve.sync(name, { basedir });
    return require(resolved); // eslint-disable-line
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      error(`ERROR: ${name} not found, please run \`npm i ${name}\``);
      process.exit();
    }
    throw e;
  }
}

module.exports = localRequire;
