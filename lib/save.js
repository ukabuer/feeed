const cheerio = require('cheerio');
const fse = require('fs-extra');
const { join } = require('path');

function getExist(id, targetDir) {
  const dir = join(process.cwd(), targetDir, `./${id}`);
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
    const guid = el.find('guid').text();
    map[guid] = true;
    return {
      id: guid,
      title: el.find('title').text(),
      link: el.find('link').text(),
      description: el.find('description').text(),
    };
  });
  return { map, items };
}

function write(id, xml, targetDir) {
  const dir = join(process.cwd(), targetDir, `./${id}`);
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
