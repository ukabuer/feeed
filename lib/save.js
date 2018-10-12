const cheerio = require('cheerio');
const crypto = require('crypto');
const fse = require('fs-extra');
const { join } = require('path');

const DIR_LEN = 16;

function getExist(link, targetDir) {
  const hash = crypto.createHash('sha256');
  hash.update(link);
  const subDir = hash.digest('hex').substr(0, DIR_LEN);
  const dir = join(process.cwd(), targetDir, `./${subDir}`);
  const file = `${dir}/rss.xml`;
  const exist = fse.existsSync(file);
  if (!exist) {
    return { map: {}, items: [] };
  }
  const xml = fse.readFileSync(file);
  const $ = cheerio.load(xml);
  const map = {};
  const items = $('item').get().map((item) => {
    const el = $(item);
    const id = el.find('a').attr('href');
    map[id] = true;
    return {
      id,
      title: el.find('title').text(),
    };
  });
  return { map, items };
}

function write(link, xml, targetDir) {
  const hash = crypto.createHash('sha256');
  hash.update(link);
  const subDir = hash.digest('hex').substr(0, DIR_LEN);
  const dir = join(process.cwd(), targetDir, `./${subDir}`);
  const file = join(dir, 'rss.xml');
  const exist = fse.existsSync(file);
  if (exist) {
    fse.renameSync(file, join(dir, `${Date.now()}.xml`));
  }
  fse.outputFileSync(file, xml);
}

module.exports = {
  getExist, write,
};
