const axios = require('axios');
const cheerio = require('cheerio');

async function crawl(target) {
  const res = await axios.get(target.link);
  const $ = cheerio.load(res.data);
  const title = $('title').text().trim();
  const items = target.process($);
  return {
    title,
    items,
  };
}

module.exports = crawl;
