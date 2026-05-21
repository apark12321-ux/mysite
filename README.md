# 곁들이 — 부업·수익화 기록 사이트

직접 해본 부업·수익화 경험을 기록하는 Astro 기반 정적 사이트입니다.
애드센스 승인과 SEO에 최적화된 구조로 설계되었습니다.

## 빠른 시작
```bash
npm install
npm run dev      # 로컬 미리보기 (localhost:4321)
npm run build    # 배포용 빌드 → dist/
```

## 발행 전 반드시 교체할 것 (검색: 대괄호 [ ])
- `astro.config.mjs` → site 도메인
- `src/layouts/Base.astro` → SITE_NAME, 애드센스 코드(승인 후)
- `src/components/Header.astro`, `Footer.astro` → 사이트 이름
- `src/pages/about.astro` → 본인 소개 (실제 경험)
- `src/pages/contact.astro` → 실제 이메일
- `src/content/posts/*.md` → 모든 [대괄호]를 본인 실제 경험·수치로

## 새 글 쓰기
`src/content/posts/` 에 `.md` 파일을 추가하면 자동으로 페이지가 생성됩니다.
제휴 링크가 있으면 frontmatter에 `affiliate: true` → 공정위 문구 자동 표시.

자세한 배포 방법은 함께 받은 "배포 가이드"를 참고하세요.
