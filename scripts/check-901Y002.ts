const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

async function findAllItems() {
  const url = `http://ecos.bok.or.kr/api/StatisticItemList/${ECOS_API_KEY}/json/kr/1/1000/901Y002`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.StatisticItemList) {
    data.StatisticItemList.row.forEach(i => {
        if (i.ITEM_NAME.includes('KOSPI') || i.ITEM_NAME.includes('KOSDAQ')) {
            console.log(`${i.ITEM_CODE}: ${i.ITEM_NAME}`);
        }
    });
  }
}

findAllItems();
