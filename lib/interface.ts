const cheerio = require("cheerio");
const fetch = require("node-fetch");

export type Item = {
  title: string;
  url: string;
  time: string;
  content: string;
};

export interface Rule {
  id: string;
  type: string;
  fetch: string | ((offset?: number) => string);
  extract: (data: string) => Array<Item>;
  cron?: string;
  limit?: number;
}

async function crawl(
  rule: Rule,
  cache: Set<string>,
  isFirst: boolean
): Promise<[Array<Item>, number]> {
  let cacheHit = isFirst;
  let offset = 0;
  const items = [];
  const max = rule.limit || 10;
  do {
    const target =
      typeof rule.fetch === "string" ? rule.fetch : rule.fetch(offset);
    const result = await fetch(target, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0"
      }
    }).then(res => {
      return res.text();
    });

    let data = null;
    const type = rule.type ? rule.type.toLowerCase() : "html";
    switch (type) {
      case "json":
        data = JSON.parse(result);
        break;
      case "html":
      case "xml":
        data = cheerio.load(result);
        break;
      case "text":
        data = result;
      default:
        throw new Error(`unknown data type: ${type}`);
    }

    const extracted = rule.extract(data);

    for (let i = 0; i < extracted.length; i++) {
      if (cache.has(extracted[i].url)) {
        cacheHit = true;
        break;
      }
      items.push(extracted[i]);
    }

    offset += 1;
  } while (!cacheHit && items.length > max);

  return [items, 10];
}

export default crawl;
