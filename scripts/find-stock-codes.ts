const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

async function findItems(tableCode: string) {
  const url = `http://ecos.bok.or.kr/api/StatisticItemList/${ECOS_API_KEY}/json/kr/1/100/${tableCode}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.StatisticItemList) {
        console.log(`--- Items for ${tableCode} ---`);
        data.StatisticItemList.row.forEach((r: any) => {
            console.log(`${r.ITEM_CODE}: ${r.ITEM_NAME} (${r.CYCLE})`);
        });
    } else {
        console.log(`No items found for ${tableCode}`);
    }
  } catch (e) {
    console.error(e);
  }
}

async function run() {
    await findItems('802Y001'); // 주식시장(일)
    await findItems('901Y002'); // 주요 지수
}
run();
