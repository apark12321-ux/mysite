// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ⚠️ 배포 전 본인 도메인으로 교체하세요. 도메인 연결 전이면 vercel 주소를 넣으세요.
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
