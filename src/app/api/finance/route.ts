import { NextResponse } from 'next/server';

const ECOS_API_KEY = '1I1SGTDT40QP2IB725YS';

async function fetchEcosData(code: string, itemCode: string, period: string = 'D') {
  try {
    const now = new Date();
    const today = now.toISOString().slice(0, 10).replace(/-/g, '');
    const ago = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10).replace(/-/g, '');
    
    const url = `http://ecos.bok.or.kr/api/StatisticSearch/${ECOS_API_KEY}/json/kr/1/10/${code}/${period}/${ago}/${today}/${itemCode}/`;
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

export async function GET() {
  const getLatest = (rows: any[]) => rows ? rows[rows.length - 1] : null;
  const getPrev = (rows: any[]) => rows && rows.length > 1 ? rows[rows.length - 2] : null;

  const formatChange = (curr: any, prev: any, isPercentage: boolean = false) => {
    if (!curr || !prev) return "0.00%";
    const valCurr = parseFloat(curr);
    const valPrev = parseFloat(prev);
    
    if (isPercentage) {
        const diff = valCurr - valPrev;
        const rate = (diff / valPrev) * 100;
        const sign = rate > 0 ? '+' : '';
        return `${sign}${rate.toFixed(2)}%`;
    } else {
        const diff = (valCurr - valPrev).toFixed(2);
        const sign = parseFloat(diff) > 0 ? '+' : '';
        return `${sign}${diff}%p`;
    }
  };

  const formatValue = (val: any, suffix: string = "%") => {
    if (!val) return "-";
    const num = parseFloat(val);
    return `${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${suffix}`;
  };

  try {
    const [baseRate, cdRate, bond3y, bond5y, bond10y, kospi, kosdaq] = await Promise.all([
      fetchEcosData('722Y001', '0101000'),
      fetchEcosData('817Y002', '010502000'),
      fetchEcosData('817Y002', '010200000'),
      fetchEcosData('817Y002', '010200001'),
      fetchEcosData('817Y002', '010210000'),
      fetchEcosData('802Y001', '0001000'),
      fetchEcosData('802Y001', '0089000'),
    ]);

    const krMarket = [
      { 
        name: "기준금리", 
        value: formatValue(getLatest(baseRate)?.DATA_VALUE), 
        change: formatChange(getLatest(baseRate)?.DATA_VALUE, getPrev(baseRate)?.DATA_VALUE)
      },
      { 
        name: "CD 금리 (91d)", 
        value: formatValue(getLatest(cdRate)?.DATA_VALUE), 
        change: formatChange(getLatest(cdRate)?.DATA_VALUE, getPrev(cdRate)?.DATA_VALUE)
      },
      { 
        name: "국고 3년", 
        value: formatValue(getLatest(bond3y)?.DATA_VALUE), 
        change: formatChange(getLatest(bond3y)?.DATA_VALUE, getPrev(bond3y)?.DATA_VALUE)
      },
      { 
        name: "국고 5년", 
        value: formatValue(getLatest(bond5y)?.DATA_VALUE), 
        change: formatChange(getLatest(bond5y)?.DATA_VALUE, getPrev(bond5y)?.DATA_VALUE)
      },
      { 
        name: "국고 10년", 
        value: formatValue(getLatest(bond10y)?.DATA_VALUE), 
        change: formatChange(getLatest(bond10y)?.DATA_VALUE, getPrev(bond10y)?.DATA_VALUE)
      },
      { 
        name: "KOSPI", 
        value: formatValue(getLatest(kospi)?.DATA_VALUE, ""), 
        change: formatChange(getLatest(kospi)?.DATA_VALUE, getPrev(kospi)?.DATA_VALUE, true)
      },
      { 
        name: "KOSDAQ", 
        value: formatValue(getLatest(kosdaq)?.DATA_VALUE, ""), 
        change: formatChange(getLatest(kosdaq)?.DATA_VALUE, getPrev(kosdaq)?.DATA_VALUE, true)
      }
    ];

    return NextResponse.json({
      market: {
        usMarket: [
          { name: "Term SOFR (1M)", value: "5.32%", change: "+0.01%" },
          { name: "3M SOFR", value: "5.35%", change: "-0.02%" },
          { name: "DOW", value: "38,798.99", change: "+0.18%" },
          { name: "NASDAQ", value: "17,192.53", change: "+0.35%" },
          { name: "S&P500", value: "5,352.96", change: "+0.11%" }
        ],
        krMarket
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
