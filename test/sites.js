module.exports = [
  {
    id: 'douban',
    title: 'Douban Recommended Movie',
    cron: '*/2 * * * *',
    link: 'https://movie.douban.com/cinema/nowplaying/hangzhou/',
    limit: 30,
    process: ($) => {
      const list = $('#nowplaying .lists > li');
      const res = [];
      list.each((index, item) => {
        const linkDOM = $(item).find('.stitle a');
        const title = linkDOM.attr('title');
        const link = linkDOM.attr('href');
        const scoreDOM = $(item).find('.srating .subject-rate');
        const score = scoreDOM.text() || 0;
        if (parseFloat(score) < 7.5) return;
        res.push({
          id: link,
          title,
          link,
          description: score,
        });
      });
      return res;
    },
  },
  {
    id: 'feeed',
    title: 'feeed commits',
    cron: '*/2 * * * *',
    type: 'json',
    link: 'https://api.github.com/repos/ukabuer/feeed/commits',
    limit: 10,
    process: (json) => {
      const list = json;
      const res = [];
      list.forEach((item) => {
        res.push({
          id: item.sha,
          title: `Commit from ${item.commit.committer.name}`,
          link: item.html_url,
          description: item.commit.message,
        });
      });
      return res;
    },
  },
];
