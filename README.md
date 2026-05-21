# 혜택로 — 정부지원금·복지 정보 사이트

육아·노후·생활복지 정부지원금을 정확하게 정리하는 Astro 기반 정적 사이트.
"정부지원금" 단일 우산 아래 3개 카테고리로 주제 일관성을 유지해 애드센스 승인에 최적화했습니다.

## 빠른 시작
```bash
npm install
npm run dev      # localhost:4321
npm run build    # → dist/
```

## 발행 전 교체할 것 (검색: ⚠️ 또는 example.com)
- astro.config.mjs → site 도메인
- src/layouts/Base.astro → SITE_NAME, 애드센스 코드(승인 후)
- src/components/Header.astro, Footer.astro → 사이트 이름
- src/pages/about.astro, contact.astro → 운영 정보, 실제 이메일
- public/robots.txt → 사이트맵 도메인

## 새 글 쓰기
src/content/posts/ 에 .md 파일 추가. frontmatter 예시는 기존 글 3개 참고.
category는 "육아·출산" / "노후·연금" / "생활복지" 중 하나로 정확히 입력.

## 중요: 정책 수치
이 사이트는 정부 정책 정보를 다룹니다. 정책·금액은 매년 바뀌므로,
글 발행/업데이트 시 공식 출처(복지로·보건복지부·국세청)에서 최신값을 반드시 확인하세요.
