# Daily Finance Dashboard MVP

금융 시장 동향을 한눈에 파악할 수 있는 일일 금융 대시보드 MVP입니다. 기존의 엑셀/PPT 보고서를 대체하기 위해 제작되었습니다.

## 주요 기능
- **일일 시황 헤더**: 당일 날짜 및 업데이트 시간 표시
- **미국/국내 시장 동향**: SOFR, 주요 지수(DOW, NASDAQ, KOSPI 등), 국고채 금리 현황
- **환율 추이**: USD/KRW 환율 차트 및 최고/최저가 표시
- **주요 그룹사 현황**: 계열사별 주가 및 신용등급, 민평금리 정보
- **금융 뉴스**: 최신 주요 금융 뉴스 리스트
- **데이터 다운로드**: 각 섹션의 원본 JSON 데이터를 개별 다운로드 가능

## 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Automation**: GitHub Actions (데이터 수집 스케줄러)
- **Deployment**: Cloudflare Pages

## 로컬 실행 방법
1. 의존성 설치:
   ```bash
   npm install
   ```
2. 개발 서버 실행:
   ```bash
   npm run dev
   ```
3. 브라우저에서 `http://localhost:3000` 접속

## 데이터 업데이트 (스케줄러)
- GitHub Actions 워크플로우(`.github/workflows/collect-daily-data.yml`)가 설정되어 있습니다.
- **평일 오전 08:30 (KST)**에 자동으로 `scripts/collect-daily-data.ts`를 실행하여 `/public/data/*.json` 파일을 업데이트합니다.
- 수동 실행: GitHub Actions 탭에서 `Collect Daily Finance Data` 워크플로우를 선택 후 `Run workflow` 클릭

## Cloudflare Pages 배포 방법
1. GitHub 저장소를 Cloudflare Pages에 연결합니다.
2. 빌드 설정을 다음과 같이 입력합니다:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Output directory**: `out`
3. 배포를 완료합니다.

## 향후 확장 (Real API 연결)
현재는 `scripts/collect-daily-data.ts`에서 모의 데이터(Mock Data)를 생성하고 있습니다. 실제 API를 연결하려면 해당 스크립트 내의 `FUTURE: Add API calls here` 주석 부분을 다음과 같이 수정하세요:
- **시장 지표**: 한국은행(BOK) API, FRED API
- **주식/지수**: Alpha Vantage, Yahoo Finance API
- **환율**: 한국수출입은행 API
- **뉴스**: Naver/Google News API

---
*본 프로젝트는 내부 보고용 MVP 버전입니다.*
