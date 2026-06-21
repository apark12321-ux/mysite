# FeedFlow Auto

1일 1피드 자동화 도구입니다.

## 포함 파일

- index.html: 피드 생성 웹앱
- styles.css: UI 스타일
- app.js: 피드 이미지, 캡션, 해시태그, 큐 관리 로직
- google_apps_script_rss_to_sheet.js: RSS에서 Google Sheet로 글감 수집
- automation_blueprint.md: 운영 설계

## 운영 흐름

Google Alerts RSS → Apps Script → Google Sheet FeedQueue → Ready 콘텐츠 선별 → FeedFlow Auto 이미지/캡션 생성 → 예약 발행 도구 연동 → Published 상태 업데이트

## 실행

브라우저에서 index.html을 열면 바로 사용할 수 있습니다.
