const axios = require('axios');
const cheerio = require('cheerio');

async function crawl(target) {
  const res = await axios.get(target.link);
  const type = typeof res.data;
  let data;
  if (target.type === 'json' || type === 'object') {
    if (type === 'string') {
      data = JSON.parse(res.data);
    } else {
      ({ data } = res);
    }
  } else if (target.type === 'raw') {
    data = res.data.toString();
  } else {
    data = cheerio.load(res.data);
  }
  const items = target.process(data);
  return items;
}

module.exports = crawl;
