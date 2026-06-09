import fs from 'fs';
import path from 'path';

/**
 * This script simulates fetching daily finance data from various APIs.
 * For the MVP, it generates mock JSON files in /public/data.
 */

const DATA_DIR = path.join(process.cwd(), 'public/data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function collectMarketData() {
  console.log('Collecting market data...');
  // FUTURE: Add API calls here (e.g., Bloomberg, FRED, Alpha Vantage)
  const marketData = {
    usMarket: [
      { name: "Term SOFR (1M)", value: "5.32%", change: "+0.01%" },
      { name: "3M SOFR", value: "5.35%", change: "-0.02%" },
      { name: "DOW", value: "38,798.99", change: "+0.18%" },
      { name: "NASDAQ", value: "17,192.53", change: "+0.35%" },
      { name: "S&P500", value: "5,352.96", change: "+0.11%" }
    ],
    krMarket: [
      { name: "기준금리", value: "3.50%", change: "0.00%" },
      { name: "CD 금리 (91d)", value: "3.60%", change: "+0.01%" },
      { name: "국고 3년", value: "3.28%", change: "-0.03%" },
      { name: "국고 5년", value: "3.31%", change: "-0.02%" },
      { name: "국고 10년", value: "3.38%", change: "-0.01%" },
      { name: "KOSPI", value: "2,701.17", change: "+1.23%" },
      { name: "KOSDAQ", value: "864.71", change: "+0.85%" }
    ]
  };
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'daily-market.json'),
    JSON.stringify(marketData, null, 2)
  );
}

async function collectExchangeHistory() {
  console.log('Collecting exchange history...');
  // FUTURE: Add API calls here
  const exchangeHistory = [
    { date: "2026-06-01", rate: 1375.5 },
    { date: "2026-06-02", rate: 1380.2 },
    { date: "2026-06-03", rate: 1378.8 },
    { date: "2026-06-04", rate: 1385.4 },
    { date: "2026-06-05", rate: 1382.1 },
    { date: "2026-06-08", rate: 1390.5 },
    { date: "2026-06-09", rate: 1388.2 }
  ];

  fs.writeFileSync(
    path.join(DATA_DIR, 'exchange-history.json'),
    JSON.stringify(exchangeHistory, null, 2)
  );
}

async function collectGroupCompanyData() {
  console.log('Collecting group company data...');
  // FUTURE: Add API calls here (e.g., KRX, Financial Data APIs)
  const groupCompanies = [
    {
      name: "계열사 A",
      prevClose: "152,000",
      changeRate: "+1.2%",
      creditRating: "AA-",
      minPyung: "3.85%"
    },
    {
      name: "계열사 B",
      prevClose: "45,300",
      changeRate: "-0.5%",
      creditRating: "A+",
      minPyung: "4.12%"
    },
    {
      name: "계열사 C",
      prevClose: "88,900",
      changeRate: "+2.3%",
      creditRating: "AA0",
      minPyung: "3.92%"
    },
    {
      name: "계열사 D",
      prevClose: "12,400",
      changeRate: "0.0%",
      creditRating: "A-",
      minPyung: "4.45%"
    }
  ];

  fs.writeFileSync(
    path.join(DATA_DIR, 'group-companies.json'),
    JSON.stringify(groupCompanies, null, 2)
  );
}

async function collectNews() {
  console.log('Collecting finance news...');
  // FUTURE: Add News API calls here
  const news = [
    {
      title: "미국 연준, 금리 인하 시점 신중론 유지...",
      source: "경제신문",
      link: "#"
    },
    {
      title: "국내 반도체 수출 호조에 KOSPI 2700선 탈환",
      source: "금융뉴스",
      link: "#"
    },
    {
      title: "SOFR 금리 변동성 완화... 시장 안정세",
      source: "마켓데일리",
      link: "#"
    },
    {
      title: "원/달러 환율, 1380원대 박스권 등락 지속",
      source: "외환보",
      link: "#"
    }
  ];

  fs.writeFileSync(
    path.join(DATA_DIR, 'news.json'),
    JSON.stringify(news, null, 2)
  );
}

async function main() {
  try {
    await collectMarketData();
    await collectExchangeHistory();
    await collectGroupCompanyData();
    await collectNews();
    console.log('Successfully updated all daily finance data.');
  } catch (error) {
    console.error('Error collecting data:', error);
    process.exit(1);
  }
}

main();
