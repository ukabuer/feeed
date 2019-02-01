# feeed

A simple tool to generate RSS feeds for any webpage, support [puppeteer](https://github.com/GoogleChrome/puppeteer).

__WARNING: still under development.__

## Installation
```
Make sure you have `nodejs` >= 7.6.0 and `npm` installed beforehand
``` shell
npm i -g feeed
```

## Usage
first of all, create a `sites.js` like this:
``` js
module.exports = [
  {
    // cron time patterns for the job
    cron: '*/30 * * * *', // run the job every 30 minutes
    // target webpage
    link: 'https://movie.douban.com/cinema/nowplaying/hangzhou/',
    // limit of item number for RSS feeds
    limit: 30,
    // if you want to use puppeteer, please install it in your project
    usePuppeteer: false,
    // customize the way to get items
    process: ($) => {
      // use $ just like using jQuery
      const list = $('#nowplaying .lists > li');
      // should use an array as return value
      const res = [];
      list.each((index, item) => {
        const linkDOM = $(item).find('.stitle a');
        const title = linkDOM.attr('title');
        const link = linkDOM.attr('href');
        const scoreDOM = $(item).find('.srating .subject-rate');
        const score = scoreDOM.text() || '-';
        res.push({
          id: link, // required
          title, // required
          link, // required
          score,
        });
      });
      return res;
    },
  },
];
```

then run
```
feeed -c ./sites.js -d ./rss
```

it will create a RSS file for the site inside `rss` directory and regist a cron job based on your configure.


And check out available options with
```
feeed --help
```
