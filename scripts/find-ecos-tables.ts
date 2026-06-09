const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

async function findTables(parentCode) {
  const url = `http://ecos.bok.or.kr/api/StatisticTableList/${ECOS_API_KEY}/json/kr/1/100/${parentCode}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

findTables('0000000048');
