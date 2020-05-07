module.exports = [
  {
    id: "douban",
    title: "Douban Recommended Movie",
    fetch: "https://movie.douban.com/cinema/nowplaying/hangzhou/",
    limit: 10,
    type: "html",
    extract: $ => {
      const list = $("#nowplaying .lists > li");
      const res = [];
      list.each((index, item) => {
        const linkDOM = $(item).find(".stitle a");
        const title = linkDOM.attr("title");
        const url = linkDOM.attr("href");
        const scoreDOM = $(item).find(".srating .subject-rate");
        const score = scoreDOM.text() || 0;
        if (parseFloat(score) < 7.5) return;
        res.push({
          title,
          url,
          time: new Date(),
          content: `评分：${score}`
        });
      });
      return res;
    }
  },
  {
    id: "smzdm-1",
    title: "什么值得买 - 口罩",
    fetch: offset =>
      `https://search.smzdm.com/?c=faxian&s=%E5%8F%A3%E7%BD%A9&p=${offset +
        1}&v=b`,
    limit: 30,
    type: "html",
    extract: $ => {
      const list = $("#feed-main-list > li");
      const res = [];
      list.each((index, item) => {
        const linkDOM = $(item).find(".feed-block-title > a:first-child");
        const title = linkDOM.attr("title");
        const url = linkDOM.attr("href");
        const priceDOM = $(item).find(".feed-block-title > a:last-child > div");
        const price = priceDOM.text() || 0;
        const timeDOM = $(item).find(".z-feed-foot-r > span.feed-block-extras");
        const time = timeDOM.text();
        res.push({
          title,
          url,
          time,
          content: `价格：${price}`
        });
      });
      return res;
    }
  }
];
