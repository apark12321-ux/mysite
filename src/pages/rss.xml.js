import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const site = context.site;
  const items = posts.map((p) => `
    <item>
      <title>${p.data.title.replace(/&/g, '&amp;')}</title>
      <link>${new URL(`/posts/${p.id}/`, site)}</link>
      <guid>${new URL(`/posts/${p.id}/`, site)}</guid>
      <description>${p.data.description.replace(/&/g, '&amp;')}</description>
      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>
    </item>`).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>혜택로</title>
    <link>${site}</link>
    <description>정부지원금·복지 혜택 가이드</description>
    <language>ko</language>${items}
  </channel>
</rss>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
