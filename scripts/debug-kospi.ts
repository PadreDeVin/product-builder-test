const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

async function debugStockData() {
  const now = new Date();
  const today = now.toISOString().slice(0, 10).replace(/-/g, '');
  const ago = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10).replace(/-/g, '');
  
  // KOSPI (802Y001 / 0001000)
  const url = `https://ecos.bok.or.kr/api/StatisticSearch/${ECOS_API_KEY}/json/kr/1/10/802Y001/D/${ago}/${today}/0001000/`;
  
  console.log(`Fetching from: ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Raw ECOS KOSPI Data:');
    console.log(JSON.stringify(data.StatisticSearch?.row, null, 2));
  } catch (e) {
    console.error(e);
  }
}

debugStockData();
