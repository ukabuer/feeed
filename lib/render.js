const h = str => (
  str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
);

module.exports = site => `<?xml version="1.0"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom='http://www.w3.org/2005/Atom'>
  <channel>
    <title>${h(site.title)}</title>
    <link>${h(site.link)}</link>
    <description>${h(site.description || site.title)}</description>
    ${site.items.map(item => `<item>
        <title>${h(item.title)}</title>
        <link>${h(item.link)}</link>
        <description>${h(item.description)}</description>
        <guid>${h(item.link)}</guid>
        <pubDate>Tue, 03 Jun 2003 09:39:21 GMT</pubDate>
    </item>
    `).join('')}
  </channel>
</rss>
`;
