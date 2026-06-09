const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

async function findItems() {
  const url = `http://ecos.bok.or.kr/api/StatisticItemList/${ECOS_API_KEY}/json/kr/1/500/901Y001`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.StatisticItemList) {
    console.log('--- Items for Table 901Y001 ---');
    data.StatisticItemList.row.forEach(i => {
        if (i.ITEM_NAME.includes('KOSPI') || i.ITEM_NAME.includes('코스피')) {
            console.log(`${i.ITEM_CODE}: ${i.ITEM_NAME}`);
        }
    });
  }
}

findItems();
