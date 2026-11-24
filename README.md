# Fund Manager Time Machine 基金經理時光機

**Play: https://chiekang.github.io/fund-manager-time-machine/**

A solo classroom game for *Financial Market and Global Business* (Fu Jen Catholic University).
You manage ◎1,000,000 of virtual money and travel back to **6 real dates between 2020 and 2025**, the years the students lived through. At each date you read the news and what experts said, then decide how to split your money. After you lock in, the real result is shown.

English is the default language, with a one-tap **中文** switch (Traditional Chinese). It runs in any browser, on a phone or a laptop. No sign-in and no server of its own; your progress stays in your browser. The only outside request is the page fonts from Google Fonts.

一個給《Financial Market and Global Business》課堂使用的單機遊戲。你有 ◎1,000,000 的虛擬資金，回到 2020 到 2025 年之間 6 個真實的日期，閱讀當時的新聞與專家看法，決定怎麼分配資金，鎖定後揭曉真實結果。預設英文，可切換中文。

![QR code](qr.png)

---

## How to play 玩法

1. Enter a nickname. Read the short **Asset School** page (what stocks, Bitcoin, bonds, gold and cash are, plus a few words like Fed, inflation, yield).
2. In each round, read the five news items and the three expert views (each is tagged bullish, cautious or mixed).
3. Split your money across **Stocks, Bitcoin, Bonds, Gold** in 5% steps. **Cash is whatever is left.** There are presets to start from.
4. Press **Lock in**. The real return of each asset to the next date is revealed, and your money is updated.
5. After the last round you see the final scoreboard, your investor type, and *what really happened next* for each date.

There is no countdown timer. Progress is saved in the browser (localStorage), so a refresh does not lose your game.

## The six rounds 六個回合

| # | Date | Event | Stocks | Bitcoin | Bonds | Gold | Cash |
|---|---|---|---:|---:|---:|---:|---:|
| 1 | 23 Mar 2020 | The world shuts down | +69% | +422% | −1% | +22% | 0% |
| 2 | 28 Jan 2021 | Reddit traders take on Wall Street | +23% | +94% | −3% | 0% | 0% |
| 3 | 10 Nov 2021 | Inflation hits a 31-year high | −6% | −37% | −5% | +3% | 0% |
| 4 | 16 Mar 2022 | The Fed raises rates for the first time in 3 years | −11% | −51% | −9% | −3% | +2% |
| 5 | 10 Mar 2023 | A bank fails overnight | +47% | +309% | +5% | +68% | +11% |
| 6 | 2 Apr 2025 | Tariff day | +21% | +6% | +4% | +40% | +3% |

Each row is the return **from that date to the next date** (round 6: to 31 Dec 2025). Round 4 and round 5 cover about 12 months and 2 years 1 month, so they are long periods. An earlier 8-round version had two more dates (30 Nov 2022 and 5 Aug 2024); they were removed to shorten the class time, and the returns of the two periods around them were recomputed from the unrounded closing prices.

## How assets are measured 資產怎麼算

| Asset | What is used |
|---|---|
| Stocks | S&P 500 index **price** (dividends not included, so stocks look slightly worse than a real investor's result) |
| Bitcoin | BTC-USD daily close (00:00–24:00 UTC), checked against Coinbase. Exchanges differ by about 1% (more in March 2020), so round 1 is "about +420%" |
| Bonds | iShares 7–10 Year Treasury fund (IEF), total return (interest included). A fund, not a single bond |
| Gold | London LBMA PM price in US dollars. There is no PM price on 31 Dec 2025, so 30 Dec is used. Several dates come from a single data source |
| Cash | 1–3 month T-bill fund (BIL), total return. A real bank deposit would pay less |

Returns in the game are whole percentages between closing prices of seven dates. Anything that happens between two dates (falls and rebounds inside a period) is **not** measured.

## Scoreboard and investor types 排行與類型

Your final result is compared with these players:

| Player | Final value from ◎1,000,000 |
|---|---:|
| Perfect hindsight (picks the best asset every round) | ◎60,920,151 (about 60×) |
| Equal split (20% each, never changes) | ◎4,178,532 |
| Buy-and-hold S&P 500 | ◎3,093,231 |
| Cash only | ◎1,166,166 |

The "perfect hindsight" player is there to show that nobody can do this in real life. The bot numbers use the whole-percent returns above.

At the end you get one of seven investor types, based on how you moved your money: **The Storm Spotter, The Bull Rider, The Safe Keeper, The Trend Chaser, The Contrarian, The Busy Trader, The Steady Mixer**. The rule for each type is in `src/core.js` (`analyze`), and every type comes with one lesson sentence.

## Teacher mode 教師模式

Add `#teacher` to the end of the URL (for example `…/fund-manager-time-machine/#teacher`) to show one **"Ask the class"** discussion question in each round. Students do not see it unless they use that URL. The questions are in this public repository, so they are not secret.

## What the game does *not* include 不包含的事

- Trading costs, taxes, and currency effects (Taiwan investors also face the TWD exchange rate).
- The fact that nobody can really trade at the exact low or high.
- Real advice. **This is a learning game, not investment advice.** Past returns do not predict the future.
- Some expert views were said on the decision date itself, and the 2 April 2025 tariffs were announced after the US market close.

## Sources 資料來源

FRED, Treasury.gov, federalreserve.gov, BLS, Yahoo Finance, StockAnalysis, CoinMarketCap, Coinbase, SD Bullion and MUFG Bullion (for LBMA data), AP, Reuters, CNBC, Fortune, Bloomberg, SEC.

Some gold values and a few other numbers rest on one data source only; they are listed in the data notes at the end of the game. The Chinese text was written by Claude and should be proofread by a Chinese-speaking teacher before class.

## Files 檔案

```
index.html          the whole game in one file (this is what GitHub Pages serves)
qr.png              QR code that opens the game
src/core.js         returns, price levels, dates, bots, investor-type rules
src/content.js      the six rounds in English: news, expert views, questions, "what happened next"
src/content_zh.js   the same content in Traditional Chinese, plus Chinese labels
src/app.js          screens, scoring display, chart, English/中文 switch, teacher mode
src/template.html   page shell and styles
src/build.py        joins the files above into index.html
```

To rebuild after editing the files in `src/`:

```
cd src
python3 build.py     # writes index.html next to the source files
```

Copy the new `index.html` to the repository root and push; GitHub Pages updates within a few minutes.

## Credits 作者

Created by Francis Lee (李紀綱), Fu Jen Catholic University, with help from Claude (Anthropic). Course: *Financial Market and Global Business*.
