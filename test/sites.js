module.exports = [
  {
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
        const score = scoreDOM.text() || '-';
        res.push({
          id: link,
          title,
          link,
          score,
        });
      });
      return res;
    },
  },
];
