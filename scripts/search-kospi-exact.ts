const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

async function searchKospi() {
  // Search tables including 'KOSPI' in their name
  const url = `http://ecos.bok.or.kr/api/StatisticTableList/${ECOS_API_KEY}/json/kr/1/500/`;
  const res = await fetch(url);
  const data = await res.json();
  const tables = data.StatisticTableList.row.filter(r => r.STAT_NAME.includes('KOSPI') || r.STAT_NAME.includes('주식'));
  console.log('--- Matching Tables ---');
  console.log(JSON.stringify(tables, null, 2));

  for (const table of tables.slice(0, 10)) {
    const itemUrl = `http://ecos.bok.or.kr/api/StatisticItemList/${ECOS_API_KEY}/json/kr/1/100/${table.STAT_CODE}`;
    const itemRes = await fetch(itemUrl);
    const itemData = await itemRes.json();
    if (itemData.StatisticItemList) {
        console.log(`\n--- Items for Table ${table.STAT_CODE} (${table.STAT_NAME}) ---`);
        const kospiItems = itemData.StatisticItemList.row.filter(i => i.ITEM_NAME.includes('KOSPI'));
        kospiItems.forEach(i => console.log(`${i.ITEM_CODE}: ${i.ITEM_NAME}`));
    }
  }
}

searchKospi();
