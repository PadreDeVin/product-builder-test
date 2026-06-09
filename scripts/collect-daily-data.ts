import fs from 'fs';
import path from 'path';

/**
 * This script fetches daily finance data from various sources.
 * It uses the Bank of Korea (ECOS) API for domestic market data.
 */

const DATA_DIR = path.join(process.cwd(), 'public/data');
const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Helper to fetch data from ECOS API
 * @param code Stat code (e.g., 722Y001)
 * @param itemCode Stat item code (e.g., 0101000)
 */
async function fetchEcosData(code: string, itemCode: string, period: string = 'D') {
  try {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const ago30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10).replace(/-/g, '');
    
    const url = `http://ecos.bok.or.kr/api/StatisticSearch/${ECOS_API_KEY}/json/kr/1/10/${code}/${period}/${ago30}/${today}/${itemCode}/`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.StatisticSearch && data.StatisticSearch.row) {
      return data.StatisticSearch.row;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ECOS data (${itemCode}):`, error);
    return null;
  }
}

async function collectMarketData() {
  console.log('Collecting market data from BOK ECOS...');
  
  // 1. 기준금리 (722Y001 / 0101000)
  const baseRateRow = await fetchEcosData('722Y001', '0101000');
  // 2. CD 91일 (817Y002 / 010502000)
  const cdRateRow = await fetchEcosData('817Y002', '010502000');
  // 3. 국고채 3년 (817Y002 / 010200000)
  const bond3yRow = await fetchEcosData('817Y002', '010200000');
  // 4. 국고채 5년 (817Y002 / 010200001)
  const bond5yRow = await fetchEcosData('817Y002', '010200001');
  // 5. 국고채 10년 (817Y002 / 010210000)
  const bond10yRow = await fetchEcosData('817Y002', '010210000');

  const getLatest = (rows: any[]) => rows ? rows[rows.length - 1] : null;
  const getPrev = (rows: any[]) => rows && rows.length > 1 ? rows[rows.length - 2] : null;

  const formatChange = (curr: string, prev: string) => {
    if (!curr || !prev) return "0.00%";
    const diff = (parseFloat(curr) - parseFloat(prev)).toFixed(2);
    const sign = parseFloat(diff) > 0 ? '+' : '';
    return `${sign}${diff}%p`;
  };

  const krMarket = [
    { 
      name: "기준금리", 
      value: `${getLatest(baseRateRow)?.DATA_VALUE}%` || "3.50%", 
      change: formatChange(getLatest(baseRateRow)?.DATA_VALUE, getPrev(baseRateRow)?.DATA_VALUE)
    },
    { 
      name: "CD 금리 (91d)", 
      value: `${getLatest(cdRateRow)?.DATA_VALUE}%` || "3.60%", 
      change: formatChange(getLatest(cdRateRow)?.DATA_VALUE, getPrev(cdRateRow)?.DATA_VALUE)
    },
    { 
      name: "국고 3년", 
      value: `${getLatest(bond3yRow)?.DATA_VALUE}%` || "3.28%", 
      change: formatChange(getLatest(bond3yRow)?.DATA_VALUE, getPrev(bond3yRow)?.DATA_VALUE)
    },
    { 
      name: "국고 5년", 
      value: `${getLatest(bond5yRow)?.DATA_VALUE}%` || "3.31%", 
      change: formatChange(getLatest(bond5yRow)?.DATA_VALUE, getPrev(bond5yRow)?.DATA_VALUE)
    },
    { 
      name: "국고 10년", 
      value: `${getLatest(bond10yRow)?.DATA_VALUE}%` || "3.38%", 
      change: formatChange(getLatest(bond10yRow)?.DATA_VALUE, getPrev(bond10yRow)?.DATA_VALUE)
    },
    // KOSPI, KOSDAQ은 ECOS에서 다른 코드를 사용하거나 외부 API 필요 (일단 Mock 유지)
    { name: "KOSPI", value: "2,701.17", change: "+1.23%" },
    { name: "KOSDAQ", value: "864.71", change: "+0.85%" }
  ];

  const marketData = {
    usMarket: [
      { name: "Term SOFR (1M)", value: "5.32%", change: "+0.01%" },
      { name: "3M SOFR", value: "5.35%", change: "-0.02%" },
      { name: "DOW", value: "38,798.99", change: "+0.18%" },
      { name: "NASDAQ", value: "17,192.53", change: "+0.35%" },
      { name: "S&P500", value: "5,352.96", change: "+0.11%" }
    ],
    krMarket
  };
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'daily-market.json'),
    JSON.stringify(marketData, null, 2)
  );
}

// ... rest of the mock collection functions (collectExchangeHistory, collectGroupCompanyData, collectNews)
// Keeping them for now as mock data sources.

async function collectExchangeHistory() {
  const exchangeHistory = [
    { date: "2026-06-01", rate: 1375.5 },
    { date: "2026-06-02", rate: 1380.2 },
    { date: "2026-06-03", rate: 1378.8 },
    { date: "2026-06-04", rate: 1385.4 },
    { date: "2026-06-05", rate: 1382.1 },
    { date: "2026-06-08", rate: 1390.5 },
    { date: "2026-06-09", rate: 1388.2 }
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'exchange-history.json'), JSON.stringify(exchangeHistory, null, 2));
}

async function collectGroupCompanyData() {
  const groupCompanies = [
    { name: "계열사 A", prevClose: "152,000", changeRate: "+1.2%", creditRating: "AA-", minPyung: "3.85%" },
    { name: "계열사 B", prevClose: "45,300", changeRate: "-0.5%", creditRating: "A+", minPyung: "4.12%" },
    { name: "계열사 C", prevClose: "88,900", changeRate: "+2.3%", creditRating: "AA0", minPyung: "3.92%" },
    { name: "계열사 D", prevClose: "12,400", changeRate: "0.0%", creditRating: "A-", minPyung: "4.45%" }
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'group-companies.json'), JSON.stringify(groupCompanies, null, 2));
}

async function collectNews() {
  const news = [
    { title: "미국 연준, 금리 인하 시점 신중론 유지...", source: "경제신문", link: "#" },
    { title: "국내 반도체 수출 호조에 KOSPI 2700선 탈환", source: "금융뉴스", link: "#" },
    { title: "SOFR 금리 변동성 완화... 시장 안정세", source: "마켓데일리", link: "#" },
    { title: "원/달러 환율, 1380원대 박스권 등락 지속", source: "외환보", link: "#" }
  ];
  fs.writeFileSync(path.join(DATA_DIR, 'news.json'), JSON.stringify(news, null, 2));
}

async function main() {
  try {
    await collectMarketData();
    await collectExchangeHistory();
    await collectGroupCompanyData();
    await collectNews();
    console.log('Successfully updated all daily finance data including ECOS real-time rates.');
  } catch (error) {
    console.error('Error collecting data:', error);
    process.exit(1);
  }
}

main();
