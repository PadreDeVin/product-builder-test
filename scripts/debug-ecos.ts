const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

async function testApi(code, itemCode) {
  const url = `http://ecos.bok.or.kr/api/StatisticSearch/${ECOS_API_KEY}/json/kr/1/5/${code}/D/20240101/20261231/${itemCode}/`;
  
  console.log(`Testing ${code} / ${itemCode}...`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  // Try different stat codes for CD/Bonds
  await testApi('102Y001', '0103000'); // CD 91d
  await testApi('102Y001', '0102000'); // Bond 3Y
  await testApi('817Y002', '0102000'); // Another possible table
}

run();
