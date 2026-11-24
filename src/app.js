(function () {
  'use strict';
  Content.forEach((r, i) => { r.zh = ContentZh[i]; });
  const C = Core, R = Content, A = C.ASSETS;
  const $ = s => document.querySelector(s);
  const app = $('#app');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const teacher = /teacher/.test(location.hash);
  const KEY = 'fmtm-v3', LKEY = 'fmtm-lang';
  let L = 'en';
  try { if (localStorage.getItem(LKEY) === 'zh') L = 'zh'; } catch (e) {}
  const zh = () => L === 'zh';
  const T = (en, z) => (zh() ? z : en);
  let S = { name: '', allocs: [], round: 0, screen: 'intro' };
  let timer = null, w = C.CASH_ALL.slice(), locked = false, view = 'intro';

  /* ---- language helpers ---- */
  const aName = j => (zh() ? Zh.assets[j].name : A[j].name);
  const aSub = j => (zh() ? Zh.assets[j].sub : A[j].sub);
  const rc = (i, k) => (zh() ? R[i].zh[k] : R[i][k]);
  const date = i => (zh() ? Zh.dates[i] : C.DATES[i]);
  const shortD = i => (zh() ? Zh.short[i] : C.SHORT[i]);
  const botName = b => (zh() ? Zh.bots[b.id] : b.name);
  const typeInfo = k => (zh() ? Zh.types[k] : C.TYPES[k]);
  const TONE = { BULL: ['BULLISH', '看多'], CAUT: ['CAUTIOUS', '謹慎'], MIX: ['MIXED', '中立'] };
  const CH = ["'20/03", "'21/01", "'21/11", "'22/03", "'23/03", "'25/04", "'25/12"];

  function save() { try { localStorage.setItem(KEY, JSON.stringify({ name: S.name, allocs: S.allocs, round: S.round, screen: S.screen })); } catch (e) {} }
  function load() { try { const j = JSON.parse(localStorage.getItem(KEY) || 'null'); if (j && Array.isArray(j.allocs)) return j; } catch (e) {} return null; }
  function clear() { try { localStorage.removeItem(KEY); } catch (e) {} }

  function tape(items) { const h = items.map(t => '<span>' + t + '</span>').join(''); $('#tape').innerHTML = h + h; }
  function tapeIntro() { tape(T(['FUND MANAGER TIME MACHINE', '2020 ▶ 2025', '6 DATES', 'TAKE YOUR TIME', 'HINDSIGHT IS 20/20'], ['基金經理時光機', '2020 ▶ 2025', '6 個時間點', '慢慢讀，慢慢想', '事後諸葛很容易'])); }
  function tapeMoves(i) { tape(A.map((a, j) => { const r = C.RET[i][j]; return (zh() ? aName(j) : aName(j).toUpperCase()) + ' <b class="' + (r >= 0 ? 'up' : 'dn') + '">' + (r >= 0 ? '▲' : '▼') + ' ' + C.pct(r) + '</b>'; })); }
  const coin = n => '◎ ' + C.fmt(n);
  const cls = r => (r >= 0 ? 'up' : 'dn');
  const up = s => (zh() ? s : s.toUpperCase());
  const chipsOf = a => '<div class="chips">' + a.map((v, j) => (v ? '<span style="--c:' + A[j].color + '">' + aName(j) + ' ' + v + '%</span>' : '')).join('') + '</div>';

  function setLang(l) {
    if (l === L) return;
    if (view === 'intro' && $('#nick')) S.name = $('#nick').value;
    L = l; try { localStorage.setItem(LKEY, l); } catch (e) {}
    document.documentElement.lang = zh() ? 'zh-Hant' : 'en';
    syncLang();
    ({ intro: intro, school: school, round: roundView, reveal: reveal, end: end })[view]();
  }
  function syncLang() { $('#l-en').className = zh() ? '' : 'on'; $('#l-zh').className = zh() ? 'on' : ''; }
  $('#l-en').onclick = () => setLang('en'); $('#l-zh').onclick = () => setLang('zh');

  /* ---------- intro ---------- */
  function intro() {
    view = 'intro'; clearInterval(timer); tapeIntro(); syncLang();
    const saved = load(); const resume = saved && (saved.round > 0 || saved.screen === 'end');
    app.innerHTML =
      '<div class="board hero"><div class="lbl">' + T('TRADING HALL · OPEN', '交易大廳 · 開市') + '</div><h1>' + T('Fund Manager<br>Time Machine', '基金經理<br>時光機') + '</h1>' +
      '<p>' + T('You manage ◎ 1,000,000 of virtual money. You travel back to 6 real dates between 2020 and 2025, years you lived through.', '你管理 ◎ 1,000,000 的虛擬資金，要回到 2020 到 2025 年之間 6 個真實的日期，那是你親身經歷過的年代。') + '</p>' +
      '<ul><li>' + T('Read the news and what experts said that day.', '讀當天的新聞，看專家怎麼說。') + '</li><li>' + T('Split your money: stocks, Bitcoin, bonds, gold, cash.', '把錢分配到股票、比特幣、債券、黃金、現金。') + '</li><li>' + T('Take your time. When you lock in, time passes and prices move.', '慢慢來，不用趕。你按下「鎖定」之後，時間會流逝，價格也會變動。') + '</li></ul>' +
      '<p class="note">' + (zh() ? BORN[1] : BORN[0]) + '</p><p>' + T('You will not know what happens next. Real fund managers never do.', '你不會知道接下來會發生什麼，真正的基金經理也一樣。') + '</p>' +
      '<input type="text" id="nick" maxlength="16" placeholder="' + T('Your nickname', '你的暱稱') + '" value="' + esc(S.name || (resume ? saved.name : '')) + '" aria-label="' + T('Your nickname', '你的暱稱') + '">' +
      '<button class="btn" id="go">' + T('Next: Asset School ▶', '下一步：資產學堂 ▶') + '</button>' +
      (resume ? '<button class="btn ghost" id="resume" style="margin-top:10px">' + T('Continue my last game', '繼續上次的遊戲') + '</button>' : '') +
      '</div><p class="note">' + T('Learning game. Not investment advice. All dates, news and price moves are real (returns are rounded).', '學習用遊戲，不是投資建議。所有日期、新聞和價格變動都是真實的（報酬已四捨五入）。') + '</p>';
    $('#go').onclick = () => { S = { name: ($('#nick').value || '').trim() || T('Player', '玩家'), allocs: [], round: 0, screen: 'round' }; save(); school(); };
    if (resume) $('#resume').onclick = () => { S = { name: saved.name || T('Player', '玩家'), allocs: saved.allocs, round: saved.round, screen: saved.screen }; if (S.screen === 'end') end(); else if (S.screen === 'reveal') reveal(); else startRound(); };
  }


  /* ---------- asset school ---------- */
  function schoolHTML() {
    const D = [
      [T('A stock is a small piece of a company. Here we use the S&P 500, the 500 biggest US companies. Prices rise when companies earn more, and also when people feel hopeful. They can fall fast.', '股票是一家公司的一小部分。這裡用標普 500，也就是美國 500 家最大的公司。公司賺得更多、或大家有信心時，價格會上漲；也可能下跌得很快。')],
      [T('Bitcoin is a digital coin. No company or government stands behind it. People trade it online, all day and night. It is new and wild: its price can double or lose half in a few months.', '比特幣是一種數位貨幣，背後沒有公司或政府。大家在網路上 24 小時買賣。它很新也很狂野：幾個月內價格可能翻倍，也可能腰斬。')],
      [T('A bond is a loan. You lend money to a government (or a company) and get interest. Here we use US government bonds. When interest rates go up, the price of older bonds goes down.', '債券是一筆借款。你把錢借給政府（或公司），並收取利息。這裡用美國政府公債。利率上升時，舊債券的價格會下跌。')],
      [T('Gold is a metal people have valued for thousands of years. It pays no interest. People often buy it when they are afraid of trouble or of rising prices.', '黃金是人類珍視了數千年的金屬，不會產生利息。大家常在擔心出事、或物價上漲時買進黃金。')],
      [T('Here, cash means short-term US government bills. It is very safe and pays interest, but it grows slowly, especially when interest rates are near zero.', '這裡的現金指的是短期美國國庫券。非常安全，也有利息，但成長很慢，尤其是利率接近零的時候。')]
    ];
    const G = [
      [T('Fed', '聯準會（Fed）'), T('The US central bank. It sets the main interest rate for the US.', '美國的央行，決定美國的基本利率。')],
      [T('Rate hike', '升息'), T('The Fed makes borrowing more expensive, to cool the economy and slow down rising prices.', '聯準會讓借錢變得更貴，為了替經濟降溫、減緩物價上漲。')],
      [T('Inflation (CPI)', '通貨膨脹（CPI）'), T('Prices rising over time. CPI is the number that measures it, for example "+6.2% from a year ago".', '物價隨時間上漲。CPI（消費者物價指數）就是衡量它的數字，例如「比一年前上漲 6.2%」。')],
      [T('Yield', '殖利率'), T('The yearly interest a bond pays, as a % of its price. When the yield goes up, the bond price goes down.', '債券每年支付的利息，占價格的百分比。殖利率上升，債券價格就下跌。')],
      [T('QE (quantitative easing)', '量化寬鬆（QE）'), T('The Fed creates money to buy bonds, to push interest rates down and calm the market.', '聯準會創造資金去買債券，壓低利率、穩定市場。')],
      [T('Recession', '經濟衰退'), T('The economy shrinks and many people lose jobs.', '經濟萎縮，很多人失業。')]
    ];
    return '<div class="board"><div class="lbl">' + T('THE FIVE ASSETS', '五種資產') + '</div>' +
      A.map((x, j) => '<div class="view" style="border-left:3px solid ' + x.color + ';padding-left:10px"><div class="who">' + aName(j) + ' <span class="note">· ' + aSub(j) + '</span></div><p>' + esc(D[j][0]) + '</p></div>').join('') + '</div>' +
      '<div class="board"><div class="lbl">' + T('WORDS YOU WILL SEE', '你會看到的名詞') + '</div>' +
      G.map(g => '<div class="view"><div class="who">' + esc(g[0]) + '</div><p>' + esc(g[1]) + '</p></div>').join('') +
      '<p class="note">' + T('Risky assets (stocks, Bitcoin) can rise a lot and fall a lot. Safer ones move less, but even "safe" assets can lose money.', '風險較高的資產（股票、比特幣）可能大漲也可能大跌；較安全的資產波動小，但就算是「安全」的資產也可能賠錢。') + '</p></div>';
  }
  function school() {
    view = 'school'; clearInterval(timer); tapeIntro(); syncLang(); S.screen = 'school'; save();
    app.innerHTML = '<div class="top"><div class="rd">' + T('ASSET SCHOOL', '資產學堂') + '</div></div><h2 class="head">' + T('Five assets, in plain words', '五種資產，用白話說明') + '</h2>' + schoolHTML() +
      '<button class="btn" id="startg">' + T('Start Round 1 ▶', '開始第 1 回合 ▶') + '</button><p class="note">' + T('You can open this page again during the game.', '遊戲進行中也可以再打開這一頁。') + '</p>';
    $('#startg').onclick = () => { S.screen = 'round'; save(); startRound(); };
    window.scrollTo(0, 0);
  }

  /* ---------- round ---------- */
  function lastAlloc() { const e = C.effective(S.allocs, S.round); return e.length ? e[e.length - 1] : C.CASH_ALL; }
  function wealthNow() { return C.path(S.allocs, S.round)[S.round]; }
  function startRound() {
    S.screen = 'round'; save();
    w = lastAlloc().slice(); locked = false;
    roundView();
  }
  function tiles(i) {
    const Lv = C.LV[i], prev = i === 0 ? null : C.RET[i - 1];
    const since = j => (prev ? '<span class="' + cls(prev[j]) + '">' + C.pct(prev[j]) + '</span> ' + T('since last date', '較上次') : T('start of game', '遊戲起點'));
    const t = (j, level, pre) => '<div class="tile" style="--c:' + A[j].color + '"><b>' + up(aName(j) + ' · ' + aSub(j)) + '</b><em>' + level + '</em><small>' + (pre || '') + since(j) + '</small></div>';
    return '<div class="tiles">' + t(0, Lv.sp.toLocaleString('en-US', { maximumFractionDigits: 0 })) + t(1, '$' + Lv.btc.toLocaleString('en-US', { maximumFractionDigits: 0 })) + t(2, Lv.y10.toFixed(2) + '%', T('10-yr yield · ', '10 年期殖利率 · ')) + t(3, '$' + Lv.gold.toLocaleString('en-US', { maximumFractionDigits: 0 })) +
      '<div class="tile wide" style="--c:' + A[4].color + '"><b>' + T('CASH · FED INTEREST RATE (TARGET RANGE)', '現金 · 聯準會利率（目標區間）') + '</b><em>' + (zh() ? Zh.fed[i] : Lv.fed) + '</em><small>' + (prev ? '<span class="' + cls(prev[4]) + '">' + C.pct(prev[4]) + '</span> ' + T('from T-bills since last date', '國庫券報酬，較上次') : T('start of game', '遊戲起點')) + '</small></div></div>';
  }
  function chart(k) {
    const idx = C.cumIndex(k), W = 320, H = 150, pl = 8, pr = 8, pt = 10, pb = 22;
    const all = [].concat.apply([], idx); const lo = Math.min.apply(null, all) * 0.92, hi = Math.max.apply(null, all) * 1.08;
    const lg = Math.log, span = lg(hi) - lg(lo);
    const X = m => pl + (k === 1 ? (W - pl - pr) / 2 : (m * (W - pl - pr)) / (k - 1)), Y = v => pt + (1 - (lg(v) - lg(lo)) / span) * (H - pt - pb);
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" role="img" aria-label="' + T('Value of 100 coins in each asset since Mar 2020 (log scale)', '2020 年 3 月的 100 元，在各資產中的價值（對數座標）') + '">';
    s += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Y(100) + '" y2="' + Y(100) + '" stroke="#2f4470" stroke-dasharray="3 3"/><text x="' + pl + '" y="' + (Y(100) - 3) + '" fill="#8fa3c2" font-size="8">100</text>';
    idx.forEach((ser, j) => { s += '<polyline points="' + ser.map((v, m) => X(m) + ',' + Y(v)).join(' ') + '" fill="none" stroke="' + A[j].color + '" stroke-width="2"/><circle cx="' + X(k - 1) + '" cy="' + Y(ser[k - 1]) + '" r="3" fill="' + A[j].color + '"/>'; });
    for (let m = 0; m < k; m++) s += '<text x="' + X(m) + '" y="' + (H - 6) + '" fill="#8fa3c2" font-size="8" text-anchor="' + (m === k - 1 && k > 1 ? 'end' : m === 0 ? 'start' : 'middle') + '">' + CH[m] + '</text>';
    return s + '</svg><p class="note" style="margin:4px 0">' + T('Log scale: equal steps up mean equal % growth.', '對數座標：每上升一格，代表相同的成長百分比。') + '</p><div class="chips">' + A.map((a, j) => '<span style="--c:' + a.color + '">' + aName(j) + '</span>').join('') + '</div>';
  }

  const ME = [
    ['You were in 高一 (first year of senior high), about 16.','Mask rationing (實名制) was in place.','你讀高一下，約 16 歲。','口罩實名制進行中。'],
    ['You were in 高二 (second year of senior high), about 17, on winter break.','','你讀高二，約 17 歲，正在放寒假。',''],
    ['You were in 高三 (third year of senior high), about 17. The 學測 exam was about 10 weeks away.','Netflix released Squid Game two months earlier.','你讀高三上，約 17 歲，離學測約 10 週。','兩個月前，《魷魚遊戲》上線。'],
    ['You were in 高三, second semester, about 18. Your 學測 scores were just out and you were choosing universities.','Russia invaded Ukraine three weeks earlier.','你讀高三下，約 18 歲，學測成績剛出，正在選校系。','三週前，俄羅斯入侵烏克蘭。'],
    ['You were in the second semester of 大一, about 19.','Schools had just ended the indoor mask rule.','你讀大一下，約 19 歲。','校園剛解除室內口罩規定。'],
    ['You were in the second semester of your third year (大三), about 21.','The US had just announced a 32% tariff on Taiwan.','你讀大三下，約 21 歲。','美國剛宣布對台灣課徵 32% 關稅。'],
  ];
  const ME_END = ['You were in your last year of university (大四), about 21. You graduate in June 2026.','Tonight, Taipei 101 held its New Year fireworks.','你讀大四上，約 21 歲，2026 年 6 月畢業。','今晚台北 101 施放跨年煙火。'];
  const BORN = ['In 2004, the year you were born: Taipei 101 opened on 31 Dec. Bitcoin did not exist yet (it started in 2009). Gold cost about $409 an ounce on average.','2004 年，你出生那一年：台北 101 在 12 月 31 日啟用。那時還沒有比特幣（2009 年才出現）。黃金全年平均每盎司約 409 美元。'];
  function meMk(a) { return { stage: zh() ? a[2] : a[0], mem: (zh() ? a[3] : a[1]) ? [zh() ? a[3] : a[1]] : [] }; }
  function meBox(r, a) {
    a = a || (r && ME[R.indexOf(r)]); if (!a) return '';
    const m = meMk(a), mem = m.mem;
    return '<div class="board you"><div class="lbl">' + T('WHERE WERE YOU THEN?', '那時的你在做什麼？') + '</div><p>' + esc(m.stage) + '</p>' + (mem.length ? '<div class="lbl" style="margin-top:10px">' + T('A STORY OF THE TIME', '那時的一件事') + '</div><ul class="news">' + mem.map(n => '<li>' + esc(n) + '</li>').join('') + '</ul>' : '') + '</div>';
  }
  function roundView() {
    view = 'round'; syncLang();
    const i = S.round, r = R[i];
    app.innerHTML =
      '<div class="top"><div class="rd">' + T('ROUND ' + (i + 1) + ' OF ' + R.length + ' · ' + date(i).toUpperCase(), '第 ' + (i + 1) + ' 回合 / 共 ' + R.length + ' 回合 · ' + date(i)) + '</div></div><div class="grid"><div>' +
      '<h2 class="head">' + esc(rc(i, 'title')) + '</h2>' +
      meBox(r) +
      '<div class="board"><div class="lbl">' + T('NEWS TODAY', '今日新聞') + '</div><ul class="news">' + rc(i, 'news').map(n => '<li>' + esc(n) + '</li>').join('') + '</ul></div>' +
      '<div class="board"><div class="lbl">' + T('MARKET BOARD', '市場看板') + '</div>' + tiles(i) + '</div>' +
      '<div class="board"><div class="lbl">' + T('WHAT 100 COINS BECAME SINCE MAR 2020', '2020 年 3 月的 100 元，後來變成多少') + '</div>' + chart(i + 1) + '</div>' +
      '<div class="board"><div class="lbl">' + T('WHAT EXPERTS SAID', '專家怎麼說') + '</div>' + r.views.map((v, k) => { const vv = zh() ? r.zh.views[k] : v; return '<div class="view"><div class="who">' + esc(vv.who) + '<span class="chip ' + v.tone + '">' + TONE[v.tone][zh() ? 1 : 0] + '</span></div><div class="meta">' + esc(vv.role) + ' · ' + esc(zh() ? v.when.replace(/(\d+) (\w+) (\d+)/, (m, d, mo, y) => y + '年' + ({ Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 })[mo] + '月' + d + '日') : v.when) + '</div><p>' + esc(vv.text) + '</p></div>'; }).join('') + '</div>' +
      '</div><div><div class="trade" id="trade"></div><details class="board" style="margin-top:12px"><summary>' + T('Asset School (quick reminder)', '資產學堂（快速複習）') + '</summary>' + schoolHTML() + '</details></div></div>';
    tradeView(); window.scrollTo(0, 0);
  }
  function setW(j, v) { if (locked) return; const others = C.sum(w.slice(0, 4)) - w[j]; v = Math.max(0, Math.min(Math.round(v / 5) * 5, 100 - others)); w[j] = v; w[4] = 100 - C.sum(w.slice(0, 4)); refreshTrade(); }
  function preset(a) { if (locked) return; w = a.slice(); refreshTrade(); }
  function tradeView() {
    $('#trade').innerHTML =
      '<div class="wl"><span class="lbl" style="margin:0">' + T('YOUR MONEY', '你的資金') + '</span><b>' + coin(wealthNow()) + '</b></div><div class="stack" id="stack"></div>' +
      [0, 1, 2, 3].map(j => '<div class="row" style="--c:' + A[j].color + '"><span class="nm">' + aName(j) + '</span><button data-j="' + j + '" data-d="-5" aria-label="' + T('Less', '減少') + ' ' + aName(j) + '">−</button><input type="range" min="0" max="100" step="5" data-j="' + j + '" aria-label="' + aName(j) + ' %"><button data-j="' + j + '" data-d="5" aria-label="' + T('More', '增加') + ' ' + aName(j) + '">+</button><span class="v" id="v' + j + '"></span></div>').join('') +
      '<div class="row" style="--c:' + A[4].color + '"><span class="nm">' + aName(4) + '</span><span></span><span class="note">' + T('what is left over', '剩下的錢') + '</span><span></span><span class="v" id="v4"></span></div>' +
      '<div class="pre"><button id="p1">' + T('Same as last', '同上次') + '</button><button id="p2">' + T('Equal split', '平均分配') + '</button><button id="p3">' + T('All cash', '全部現金') + '</button>' + '' + '</div>' +
      '<button class="btn" id="lock">' + T('Lock in', '鎖定') + '</button>';
    document.querySelectorAll('#trade button[data-j]').forEach(b => b.onclick = () => { const j = +b.dataset.j; setW(j, w[j] + +b.dataset.d); });
    document.querySelectorAll('#trade input[type=range]').forEach(r => r.oninput = () => setW(+r.dataset.j, +r.value));
    $('#p1').onclick = () => preset(lastAlloc()); $('#p2').onclick = () => preset([20, 20, 20, 20, 20]); $('#p3').onclick = () => preset(C.CASH_ALL);
    $('#lock').onclick = lock; refreshTrade();
  }
  function refreshTrade() {
    $('#stack').innerHTML = w.map((v, j) => '<i style="width:' + v + '%;background:' + A[j].color + '"></i>').join('');
    w.forEach((v, j) => { $('#v' + j).textContent = v + '%'; if (j < 4) document.querySelector('#trade input[data-j="' + j + '"]').value = v; });
  }
  function lock() { if (locked) return; locked = true; clearInterval(timer); S.allocs[S.round] = w.slice(); S.screen = 'reveal'; save(); reveal(); }

  /* ---------- reveal ---------- */
  function standings(upto) {
    const rows = [{ name: S.name || T('You', '你'), me: true, v: C.path(S.allocs, upto)[upto] }];
    C.BOTS.forEach(b => rows.push({ name: botName(b), bot: true, v: C.path(b.allocs, upto)[upto] }));
    return rows.sort((a, b) => b.v - a.v);
  }
  function reveal() {
    view = 'reveal'; clearInterval(timer); syncLang();
    const i = S.round, ret = C.RET[i], a = C.effective(S.allocs, i + 1)[i];
    const before = C.path(S.allocs, i)[i], after = C.path(S.allocs, i + 1)[i + 1], gain = Math.round((after / before - 1) * 1000) / 10;
    tapeMoves(i);
    const best = Math.max.apply(null, ret), maxAbs = Math.max.apply(null, ret.map(Math.abs)) || 1;
    const span = zh() ? Zh.span[i] : C.SPAN[i];
    app.innerHTML =
      '<div class="top"><div class="rd">' + T('ROUND ' + (i + 1) + ' OF ' + R.length + ' · RESULT', '第 ' + (i + 1) + ' 回合 · 結果') + '</div><div class="rd">' + up(shortD(i)) + ' ▶ ' + up(shortD(i + 1)) + '</div></div>' +
      '<div class="board rev"><div class="lbl">' + T('TIME PASSES: ' + span.toUpperCase() + ' LATER', '時間流逝：' + span + '後') + '</div>' +
      A.map((x, j) => '<div class="asset"><span class="nm">' + aName(j) + '</span><div class="t"><i data-r="' + ret[j] + '" style="' + (ret[j] >= 0 ? 'left:50%' : 'right:50%') + ';width:0;background:' + (ret[j] >= 0 ? 'var(--up)' : 'var(--down)') + '"></i><span style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:#3a4f7c"></span></div><span class="n ' + cls(ret[j]) + '">' + C.pct(ret[j]) + (ret[j] === best ? ' ★' : '') + '</span></div>').join('') +
      '<p class="note">' + T('★ best asset this round. Stock returns are price only (no dividends). Bond and cash returns include interest.', '★ 本回合表現最好的資產。股票報酬只含價格（不含股息）。債券和現金報酬含利息。') + '</p></div>' +
      '<div class="board"><div class="lbl">' + T('YOUR RESULT', '你的成績') + '</div><div class="big ' + cls(gain) + '">' + (gain >= 0 ? '+' : '−') + Math.abs(gain).toFixed(1) + '%</div>' +
      '<div class="sub">' + coin(before) + ' ▶ <b style="color:var(--txt)">' + coin(after) + '</b></div>' + chipsOf(a) + '</div>' +
      '<div class="board"><div class="lbl">' + T('SCOREBOARD AFTER ROUND ' + (i + 1), '第 ' + (i + 1) + ' 回合後的排行榜') + '</div><table class="lb">' + standings(i + 1).map((r, k) => '<tr class="' + (r.me ? 'me' : '') + '"><td>' + (k + 1) + '</td><td>' + esc(r.name) + (r.bot ? ' <span class="note">' + T('(bot)', '（機器人）') + '</span>' : '') + '</td><td>' + coin(r.v) + '</td></tr>').join('') + '</table></div>' +
      (teacher ? '<div class="ask"><b>' + T('Ask the class:', '問問全班：') + '</b> ' + esc(rc(i, 'ask')) + '</div>' : '') +
      '<button class="btn" id="next">' + (i < R.length - 1 ? T('Next date ▶', '下一個日期 ▶') : T('See my investor type ▶', '看我的投資人類型 ▶')) + '</button>';
    requestAnimationFrame(() => setTimeout(() => document.querySelectorAll('.asset .t i').forEach(b => { b.style.width = (Math.abs(+b.dataset.r) / maxAbs * 50) + '%'; }), 60));
    window.scrollTo(0, 0);
    $('#next').onclick = () => { if (i < R.length - 1) { S.round = i + 1; startRound(); } else { S.screen = 'end'; save(); end(); } };
  }

  /* ---------- end ---------- */
  function end() {
    view = 'end'; clearInterval(timer); tapeIntro(); syncLang();
    const me = C.path(S.allocs, R.length)[R.length], an = C.analyze(S.allocs), info = typeInfo(an.type), eff = C.effective(S.allocs, R.length);
    const total = Math.round((me / C.START - 1) * 100);
    const botFinals = C.BOTS.map(b => C.finalOf(b.allocs)), beat = botFinals.filter(v => me > v).length;
    const rows = [{ name: S.name || T('You', '你'), me: true, v: me }].concat(C.BOTS.map((b, k) => ({ name: botName(b), v: botFinals[k] })), [{ name: botName(C.HINDSIGHT), v: C.finalOf(C.HINDSIGHT.allocs) }]).sort((x, y) => y.v - x.v);
    const text = T('Fund Manager Time Machine: ' + (S.name || 'I') + ' = ' + info.name + '. Final: ' + coin(me) + ' (' + C.pct(total) + ').', '基金經理時光機：' + (S.name || '我') + ' 是「' + info.name + '」。最終資金 ' + coin(me) + '（' + C.pct(total) + '）。');
    app.innerHTML =
      '<div class="card"><div class="k">' + T('YOUR INVESTOR TYPE', '你的投資人類型') + '</div><h2>' + (zh() ? esc(info.name) : esc(info.name).replace('The ', 'The<br>')) + '</h2><p>' + esc(info.line) + '</p>' +
      '<div class="stats"><div><b class="' + cls(total) + '">' + C.pct(total) + '</b><span>' + T('total result', '總報酬') + '</span></div><div><b>' + an.avgRisk + '%</b><span>' + T('avg. in stocks + Bitcoin', '平均持有股票＋比特幣') + '</span></div><div><b>' + beat + ' / 3</b><span>' + T('bots you beat', '打敗的機器人') + '</span></div></div>' +
      '<p class="note" style="margin-top:12px">' + esc(info.lesson) + '</p></div>' +
      meBox(null, ME_END) +
      '<div class="board"><div class="lbl">' + T('FINAL SCOREBOARD · DEC 2025', '最終排行榜 · 2025 年 12 月') + '</div><table class="lb">' + rows.map((r, k) => '<tr class="' + (r.me ? 'me' : '') + '"><td>' + (k + 1) + '</td><td>' + esc(r.name) + '</td><td>' + coin(r.v) + '</td></tr>').join('') + '</table>' +
      '<p class="note" style="margin-top:8px">' + T('The "perfect hindsight" player knew the best asset each time. Nobody can: its result is about 60 times the start money, driven by Bitcoin\'s +422% in round 1. There are no trading costs in this game.', '「完美事後諸葛」每次都知道哪個資產最好，但現實中沒有人做得到。它的成績約為本金的 60 倍，主要來自第 1 回合比特幣的 +422%。這個遊戲沒有計入交易成本。') + '</p></div>' +
      '<div class="board"><div class="lbl">' + T('WHAT REALLY HAPPENED NEXT', '後來實際發生了什麼') + '</div>' + R.map((r, i) => { const bj = C.bestAsset(i); return '<details' + (i === 0 ? ' open' : '') + '><summary>' + (i + 1) + '. ' + date(i) + ' — ' + esc(rc(i, 'title')) + '</summary>' + chipsOf(eff[i]) + '<ul>' + rc(i, 'after').map(t => '<li>' + esc(t) + '</li>').join('') + '</ul><p class="note">' + T('Best asset this round: ' + aName(bj) + ' (' + C.pct(C.RET[i][bj]) + '). Your result: ' + C.pct(Math.round((C.growth(eff[i], i) - 1) * 100)) + '.', '本回合表現最好的資產：' + aName(bj) + '（' + C.pct(C.RET[i][bj]) + '）。你的成績：' + C.pct(Math.round((C.growth(eff[i], i) - 1) * 100)) + '。') + '</p></details>'; }).join('') + '</div>' +
      '<div class="board"><div class="lbl">' + T('THE BIG IDEA', '重點') + '</div><p style="line-height:1.6;font-size:15px">' + T('Looking back, every turning point looks obvious. At the time, experts disagreed and the news could be read in two ways. That is why diversification and a long-term plan matter.', '回頭看，每個轉折點都顯得很明顯。但在當時，專家意見不一，新聞也可以有兩種解讀。這就是為什麼分散投資和長期計畫很重要。') + '</p></div>' +
      '<div class="board"><div class="lbl">' + T('DATA NOTES AND SOURCES', '資料說明與來源') + '</div><p class="note">' + T(
        'Whole-percent returns between the closing prices of seven dates; nothing in between is measured (falls and rebounds inside a period are not shown). Stocks: S&P 500 index price, dividends NOT included (so stocks look slightly worse than real investors\' results). Bitcoin: daily close (00:00-24:00 UTC, CoinMarketCap/Yahoo, checked against Coinbase). Bitcoin trades all day and exchanges differ by about 1% (more in March 2020), so round 1 is "about +420%". Bonds: the iShares 7-10 year Treasury fund (IEF), interest included; a fund, not a single bond. Cash: a 1-3 month T-bill fund (BIL), interest included; a real bank deposit would pay less. Gold: London LBMA afternoon price in US dollars (several dates come from one data source); there was no afternoon price on 31 Dec 2025, so the last one of the year (30 Dec) is used. Fed rate: range in force after the close; the 16 Mar 2022 rise was announced that day and started on 17 March. Dates mix closing times (US 4 pm, London gold 3 pm, Bitcoin midnight UTC). Not included: trading costs, taxes, currency effects (Taiwan investors face TWD), and the fact that nobody can really trade at the exact low. Bots and totals use whole-percent returns, so they differ slightly from exact figures. Some views were said on the decision date itself, and the 2 April 2025 tariffs came after the close. Sources: FRED, Treasury.gov, federalreserve.gov, BLS, Yahoo Finance, StockAnalysis, CoinMarketCap, Coinbase, SD Bullion and MUFG Bullion (LBMA data), AP, Reuters, CNBC, Fortune, Bloomberg, SEC. Not investment advice.',
        '七個日期收盤價之間的整數百分比報酬；期間內的漲跌不在衡量範圍內。股票：標普 500 指數價格，不含股息（所以股票看起來比真實投資人的結果略差）。比特幣：每日收盤價（世界標準時間 00:00–24:00，取自 CoinMarketCap／Yahoo，並用 Coinbase 交叉檢查）。比特幣全天交易，各交易所價格相差約 1%（2020 年 3 月更大），所以第 1 回合是「約 +420%」。債券：iShares 7–10 年期美國公債基金（IEF），含利息；是基金，不是單一債券。現金：1–3 個月期國庫券基金（BIL），含利息；真實的銀行存款利率會更低。黃金：倫敦 LBMA 下午定盤價（美元）；有幾個日期只有單一資料來源。2025 年 12 月 31 日沒有下午定盤價，所以使用該年最後一次（12 月 30 日）。聯準會利率：收盤後生效的區間；2022 年 3 月 16 日的升息是當天宣布、3 月 17 日生效。各資產的收盤時間不同（美股下午 4 點、倫敦黃金下午 3 點、比特幣為世界標準時間午夜）。未計入：交易成本、稅、匯率（台灣投資人還要面對新台幣）、以及沒有人真能剛好在最低點成交。機器人與總成績使用整數百分比，與精確數字略有差異。有些專家說法是在決策日當天發表的，2025 年 4 月 2 日的關稅則是在收盤後才宣布。資料來源：FRED、美國財政部、聯準會、美國勞工統計局、Yahoo Finance、StockAnalysis、CoinMarketCap、Coinbase、SD Bullion 與 MUFG Bullion（LBMA 資料）、美聯社、路透、CNBC、Fortune、彭博、SEC。非投資建議。') + '</p></div>' +
      '<button class="btn" id="copy">' + T('Copy my result', '複製我的成績') + '</button><button class="btn ghost" id="again" style="margin-top:10px">' + T('Play again', '再玩一次') + '</button>';
    $('#copy').onclick = () => { const b = $('#copy'); const done = ok => { b.textContent = ok ? T('Copied!', '已複製！') : text; }; try { navigator.clipboard.writeText(text).then(() => done(true), () => done(false)); } catch (e) { done(false); } };
    $('#again').onclick = () => { clear(); S = { name: S.name, allocs: [], round: 0, screen: 'intro' }; intro(); };
    window.scrollTo(0, 0);
  }

  window.__fmtm = { S: () => S, startRound, intro, school, reveal, end, setLang };
  document.documentElement.lang = zh() ? 'zh-Hant' : 'en';
  intro();
})();
