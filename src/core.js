/* Fund Manager Time Machine v2 (2020-2025) — data + scoring (all numbers from research2/06_verified.md) */
const Core = (function () {
  const START = 1000000;
  const ASSETS = [
    { k: 'stocks',  name: 'Stocks',  sub: 'S&P 500', color: '#38bdf8' },
    { k: 'bitcoin', name: 'Bitcoin', sub: 'BTC price', color: '#fb923c' },
    { k: 'bonds',   name: 'Bonds',   sub: 'US Treasuries', color: '#2dd4bf' },
    { k: 'gold',    name: 'Gold',    sub: 'Gold price', color: '#fbbf24' },
    { k: 'cash',    name: 'Cash',    sub: 'Short-term T-bills', color: '#94a3b8' }
  ];
  // Whole-percent returns from this round to the next (index 0 = R1->R2 ... 5 = R6->31 Dec 2025; R4->R5 and R5->R6 each span more than one year-step of the original 9-date table, computed from unrounded closes).
  // Order: stocks, bitcoin, bonds, gold, cash. From research2/06_verified.md section C.
  const RET = [
    [ 69, 422, -1, 22, 0],
    [ 23,  94, -3,  0, 0],
    [ -6, -37, -5,  3, 0],
    [-11, -51, -9, -3, 2],
    [ 47, 309,  5, 68, 11],
    [ 21,   6,  4, 40, 3]
  ];
  // Levels on each date (index 0..7) + 31 Dec 2025 (index 8)
  const LV = [
    { sp: 2237.40, btc: 6416.31,  y10: 0.76, gold: 1525.40, fed: '0–0.25%' },
    { sp: 3787.38, btc: 33466.10, y10: 1.07, gold: 1853.70, fed: '0–0.25%' },
    { sp: 4646.71, btc: 64995.23, y10: 1.56, gold: 1859.40, fed: '0–0.25%' },
    { sp: 4357.86, btc: 41143.93, y10: 2.19, gold: 1913.20, fed: '0–0.25% (hike announced today)' },
    { sp: 3861.59, btc: 20187.24, y10: 3.70, gold: 1861.25, fed: '4.50–4.75%' },
    { sp: 5670.97, btc: 82485.71, y10: 4.20, gold: 3119.75, fed: '4.25–4.50%' },
    { sp: 6845.50, btc: 87508.83, y10: 4.18, gold: 4367.80, fed: '3.50–3.75%' }
  ];
  const DATES = ['23 Mar 2020', '28 Jan 2021', '10 Nov 2021', '16 Mar 2022', '10 Mar 2023', '2 Apr 2025', '31 Dec 2025'];
  const SHORT = ['Mar 2020', 'Jan 2021', 'Nov 2021', 'Mar 2022', 'Mar 2023', 'Apr 2025', 'Dec 2025'];
  const SPAN = ['10 months', '9 months', '4 months', '12 months', '2 years 1 month', '9 months'];
  const CASH_ALL = [0, 0, 0, 0, 100];
  const N = RET.length;

  const sum = a => a.reduce((x, y) => x + y, 0);
  const mean = a => (a.length ? sum(a) / a.length : 0);
  const validAlloc = a => Array.isArray(a) && a.length === 5 && a.every(v => Number.isInteger(v) && v >= 0) && sum(a) === 100;

  // allocs: array (len<=N) of allocation arrays or null. Missing = carry over previous (R1 default: all cash).
  function effective(allocs, upto) {
    const out = []; let prev = CASH_ALL;
    for (let i = 0; i < upto; i++) {
      const a = validAlloc(allocs[i]) ? allocs[i] : prev;
      out.push(a); prev = a;
    }
    return out;
  }
  function growth(a, i) { let m = 0; for (let j = 0; j < 5; j++) m += (a[j] / 100) * (1 + RET[i][j] / 100); return m; }
  function path(allocs, upto) {
    const eff = effective(allocs, upto); const p = [START];
    for (let i = 0; i < upto; i++) p.push(p[i] * growth(eff[i], i));
    return p;
  }
  function fixed(a) { return Array.from({ length: N }, () => a); }
  function bestAsset(i) { const r = RET[i]; return r.indexOf(Math.max.apply(null, r)); }
  function hindsight() { return Array.from({ length: N }, (_, i) => { const a = [0, 0, 0, 0, 0]; a[bestAsset(i)] = 100; return a; }); }
  const BOTS = [
    { id: 'sp',   name: 'Buy-and-hold S&P 500', allocs: fixed([100, 0, 0, 0, 0]) },
    { id: 'eq',   name: 'Equal split (20% each)', allocs: fixed([20, 20, 20, 20, 20]) },
    { id: 'cash', name: 'Cash only', allocs: fixed(CASH_ALL) }
  ];
  const HINDSIGHT = { id: 'time', name: 'Perfect hindsight', allocs: hindsight() };
  const finalOf = allocs => path(allocs, N)[N];

  // Cumulative index per asset at rounds 1..k (R1 = 100)
  function cumIndex(k) {
    return ASSETS.map((_, j) => { const s = [100]; for (let i = 0; i < k - 1; i++) s.push(s[i] * (1 + RET[i][j] / 100)); return s; });
  }

  const TYPES = {
    storm: { name: 'The Storm Spotter', line: 'You cut your risk before the 2022 fall.', lesson: 'Acting on a warning (6.2% inflation in Nov 2021) while prices are still near record highs is hard. Staying out too long can also cost you: stocks and Bitcoin rose strongly after 2023.' },
    bull:  { name: 'The Bull Rider', line: 'You love stocks and Bitcoin, and you ride the waves.', lesson: 'High risk paid a lot in 2020-21 and 2023-25, but the year after March 2022 was deep: Bitcoin fell 51% and stocks fell too.' },
    safe:  { name: 'The Safe Keeper', line: 'You prefer bonds, gold and cash. You sleep well.', lesson: 'Safe assets protect you in a crisis, but you can miss big rallies. And bonds are not always safe: they lost 9% in the year after March 2022 when interest rates rose.' },
    chase: { name: 'The Trend Chaser', line: 'You often move money into last round\'s winner.', lesson: 'Last period\'s winner is not always the next winner. After +422% and +94%, Bitcoin then fell 37% and 51%.' },
    contra:{ name: 'The Contrarian', line: 'You often buy what just fell, or sell what just rose.', lesson: 'Going against the crowd can work, but timing is the hard part.' },
    busy:  { name: 'The Busy Trader', line: 'You change your mix a lot, round after round.', lesson: 'Every move needs a good reason. In real life, trading also costs money.' },
    mix:   { name: 'The Steady Mixer', line: 'You spread your money and change it slowly.', lesson: 'Diversification does not win every round, but it avoids the worst surprises.' }
  };

  function analyze(allocs) {
    const eff = effective(allocs, N);
    const risk = a => a[0] + a[1];
    const avgRisk = mean(eff.map(risk));
    let moves = 0, chase = 0, contra = 0; const shifts = [];
    for (let i = 1; i < N; i++) {
      const d = eff[i].map((v, j) => v - eff[i - 1][j]);
      const shift = sum(d.filter(v => v > 0)); shifts.push(shift);
      if (shift >= 10) {
        moves++;
        const j = d.indexOf(Math.max.apply(null, d)); const r = RET[i - 1];
        if (r[j] === Math.max.apply(null, r)) chase++;
        if (r[j] === Math.min.apply(null, r)) contra++;
      }
    }
    const turnover = mean(shifts);
    const riskEarly = mean(eff.slice(0, 2).map(risk));
    let t = 'mix';
    if (riskEarly >= 40 && Math.min(risk(eff[2]), risk(eff[3])) <= 30) t = 'storm';
    else if (avgRisk >= 70) t = 'bull';
    else if (avgRisk <= 30) t = 'safe';
    else if (chase >= 3) t = 'chase';
    else if (contra >= 3) t = 'contra';
    else if (turnover >= 30) t = 'busy';
    return { type: t, info: TYPES[t], avgRisk: Math.round(avgRisk), moves, chase, contra, turnover: Math.round(turnover) };
  }

  const fmt = n => Math.round(n).toLocaleString('en-US');
  const pct = n => (n > 0 ? '+' : n < 0 ? '−' : '') + Math.abs(n) + '%';

  return { START, ASSETS, N, RET, LV, DATES, SHORT, SPAN, CASH_ALL, BOTS, HINDSIGHT, TYPES, validAlloc, effective, path, finalOf, cumIndex, analyze, bestAsset, growth, fmt, pct, sum };
})();
if (typeof module !== 'undefined') module.exports = Core;
