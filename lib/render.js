module.exports = site => `
<doctype xml>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom='http://www.w3.org/2005/Atom'>
  <channel>
    <title>${site.title}</title>
    <link>${site.link}</link>
    ${site.items.map(item => `
    <item>
      <title>${item.title}</title>
      <a href="${item.link}">${item.title}</a>
      <updated>${item.date}</updated>
    </item>
    `).join('')}
  </channel>
</rss>
`;
