const axios = require('axios');
const cheerio = require('cheerio');
const localRequire = require('./require');

async function crawl(target) {
  let data = null;

  if (target.usePuppeteer) {
    let puppeteer = null;
    puppeteer = localRequire('puppeteer', process.cwd());
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(target.link);
    data = await page.content();
    await browser.close();
  } else {
    const res = await axios.get(target.link);
    ({ data } = res);
  }

  const type = typeof data;
  if (target.type === 'json' && type === 'string') {
    data = JSON.parse(data);
  } else if (target.type === 'raw') {
    data = data.toString();
  } else if (type === 'string') {
    data = cheerio.load(data);
  }
  const items = target.process(data);
  return items;
}

module.exports = crawl;
