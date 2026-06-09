const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

async function findItems(tableCode) {
  const url = `http://ecos.bok.or.kr/api/StatisticItemList/${ECOS_API_KEY}/json/kr/1/100/${tableCode}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

findItems('817Y002');
