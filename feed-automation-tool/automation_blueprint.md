# 완전 자동화 운영 설계

## 데이터 구조

Google Sheet의 FeedQueue 시트를 기준 큐로 사용합니다.

컬럼: Status, Title, Body, Tags, SourceUrl, PublishedAt, ScheduledAt

상태값: Ready, Generated, Scheduled, Published

## 자동 수집

google_apps_script_rss_to_sheet.js를 Google Sheet Apps Script에 붙여넣고 RSS_FEEDS에 구글알리미 RSS 주소를 넣습니다.

createDailyTrigger 함수를 한 번 실행하면 매일 신규 글감이 자동 수집됩니다.

## 자동 제작

index.html을 열고 Ready 콘텐츠를 넣으면 1080x1080 피드 이미지, 캡션, 해시태그가 생성됩니다.

다음 단계에서는 Google Sheet API를 연결해 Ready 행을 자동으로 가져오면 됩니다.

## 예약 발행

발행 도구는 Meta Business Suite, Buffer, Make, Zapier, Meta Graph API 중 하나를 사용하면 됩니다.

## 다음 개발 단계

- Google Sheet API 연결
- 템플릿 다중화
- 캐러셀 여러 장 생성
- 브랜드별 톤 프리셋
- 예약 발행 API 연결
- 발행 결과 로그 저장
