/* Round content v3 (6 rounds, 2020-2025, simple English). Every fact is from research2/06_verified.md (with 04_events.md and 05_views.md) or computed from its numbers. Rounds 5 (Nov 2022) and 7 (Aug 2024) of the 8-round version were removed. */
const Content = [
 {
  "n": 1,
  "date": "23 Mar 2020",
  "title": "The world shuts down",
  "news": [
   "COVID-19 is spreading around the world. Many countries are closing borders and telling people to stay home.",
   "Stocks have fallen fast. The S&P 500 closed at 2,237 today. That is 34% below its record high of 3,386 on 19 February.",
   "This morning, before the market opened, the Fed said it will keep buying government bonds and mortgage bonds \"in the amounts needed\". There is no fixed limit, so the press calls it \"unlimited QE\" (the Fed creates money to buy bonds). It also started new programs to lend to companies.",
   "The Fed's interest rate is already almost zero (0-0.25%). The 10-year yield is 0.76%.",
   "Gold is $1,525 an ounce. Bitcoin is about $6,400."
  ],
  "views": [
   {
    "who": "Federal Reserve",
    "role": "US central bank, statement",
    "when": "23 Mar 2020",
    "tone": "BULL",
    "text": "Says it is \"committed to use its full range of tools\" to support the US economy. It will buy bonds as much as needed."
   },
   {
    "who": "Bill Ackman",
    "role": "Hedge fund manager, Pershing Square",
    "when": "18 Mar 2020",
    "tone": "CAUT",
    "text": "Urges the President to close the country for 30 days. He says a short, strong shutdown is better than a long, messy one. \"the only answer is to shut down the country for the next 30 days\""
   },
   {
    "who": "Jeremy Siegel",
    "role": "Professor, Wharton School",
    "when": "12 Mar 2020",
    "tone": "MIX",
    "text": "Worried in the short term, and says \"I think we need bold measures\". He thinks the recovery can come faster than in 2008."
   }
  ],
  "ask": "Stocks are down 34% in five weeks, and the Fed is stepping in. Do you buy, or do you wait?",
  "after": [
   "Today was the lowest close of the crash. On 27 March the US Congress passed a rescue package of about $2 trillion (the CARES Act).",
   "By 18 August the S&P 500 had reached a new record. By January 2021 it was 69% higher than today, and Bitcoin was 422% higher."
  ]
 },
 {
  "n": 2,
  "date": "28 Jan 2021",
  "title": "Reddit traders take on Wall Street",
  "news": [
   "GameStop (GME) is a video-game store chain. Small investors, organized on a Reddit forum, have been buying its shares. Hedge funds that bet the price would fall (short sellers) are losing a lot of money.",
   "Today GME opened at $265 and touched $483. It closed at $193.60, down from $347.51 yesterday.",
   "Robinhood and other brokers stopped customers from buying GME, AMC and other shares. Customers could still sell. Robinhood said it was because of higher deposit rules at the clearing house.",
   "The stock market as a whole did fine: the S&P 500 rose 1% to 3,787. It is 69% above its March 2020 low.",
   "Bitcoin is $33,466, more than 5 times higher than in March 2020. The Fed rate is 0-0.25%. Gold is $1,854."
  ],
  "views": [
   {
    "who": "Elon Musk",
    "role": "CEO of Tesla and SpaceX",
    "when": "26 Jan 2021",
    "tone": "BULL",
    "text": "Tweets \"Gamestonk!!\" with a link to the Reddit forum that was hyping GameStop. The shares then jumped in after-hours trading."
   },
   {
    "who": "Michael Burry",
    "role": "Investor, Scion Asset Management",
    "when": "27 Jan 2021",
    "tone": "CAUT",
    "text": "Calls the trading \"unnatural, insane, and dangerous\" and asks the SEC (the US market regulator) to look at it."
   },
   {
    "who": "Chamath Palihapitiya",
    "role": "Venture investor",
    "when": "27 Jan 2021",
    "tone": "MIX",
    "text": "Bought GameStop call options, then says he sold that morning. He also defends small investors against Wall Street."
   }
  ],
  "ask": "Prices are being moved by a crowd on social media. Is this investing, or a game? How does it end?",
  "after": [
   "On 18 February the US House of Representatives held a hearing called \"Game Stopped?\". The bosses of Robinhood, Citadel, Melvin Capital and Reddit all gave evidence.",
   "GameStop's price soon fell sharply. Over the next 9 months stocks rose 23% and Bitcoin rose 94%."
  ]
 },
 {
  "n": 3,
  "date": "10 Nov 2021",
  "title": "Inflation hits a 31-year high",
  "news": [
   "This morning the US government said consumer prices in October were 6.2% higher than a year ago. It is the biggest 12-month rise since November 1990.",
   "Stocks dipped a little: the S&P 500 closed at 4,647 (-0.8%), just below its record close of 8 November.",
   "Bitcoin touched a new record of about $69,000 today. The daily close was $64,995.",
   "On 3 November the Fed began to slow its bond buying. It still calls high inflation \"transitory\" (meaning temporary), and its rate is 0-0.25%.",
   "The 10-year yield is 1.56%. Gold is $1,859."
  ],
  "views": [
   {
    "who": "Jerome Powell",
    "role": "Fed Chair",
    "when": "3 Nov 2021",
    "tone": "MIX",
    "text": "The Fed starts to slow its bond buying, but it is not time to raise rates yet. He says \"transitory is a word that people have had different understandings of.\""
   },
   {
    "who": "Larry Summers",
    "role": "Harvard professor, former US Treasury Secretary",
    "when": "5 Nov 2021",
    "tone": "CAUT",
    "text": "Says the Fed is letting inflation run. If it speeds up, central banks have almost no proven record of bringing the economy down softly."
   },
   {
    "who": "Cathie Wood",
    "role": "Founder, ARK Invest",
    "when": "25 Oct 2021",
    "tone": "BULL",
    "text": "Disagrees with warnings of runaway inflation. She expects price pressure to ease after the holidays."
   }
  ],
  "ask": "Inflation is 6.2% and the Fed calls it temporary. Who do you believe? Do you still hold your risky assets?",
  "after": [
   "On 15 December the Fed dropped the word \"transitory\" and sped up the end of its bond buying. On 3 January 2022 the S&P 500 had its last record close before a long fall.",
   "Bitcoin was down 37% by March 2022. By November 2022 its daily close was about 77% below its November 2021 peak close."
  ]
 },
 {
  "n": 4,
  "date": "16 Mar 2022",
  "title": "The Fed raises rates for the first time in 3 years",
  "news": [
   "At 2:00 pm today the Fed raised its interest rate by 0.25 points, to 0.25-0.50%. It is the first rise since December 2018. One member wanted a bigger rise (0.50). The new rate starts tomorrow.",
   "The Fed expects more: officials' forecasts point to about seven rises in 2022.",
   "Russia invaded Ukraine on 24 February. Oil jumped. Brent crude settled at $127.98 on 8 March and is falling now.",
   "Stocks rose today: the S&P 500 gained 2.2% to 4,358. It is 9% below its record close of 3 January.",
   "The 10-year yield is 2.19%, up from 1.56% in November. Bitcoin is $41,144 and gold is $1,913."
  ],
  "views": [
   {
    "who": "Jerome Powell",
    "role": "Fed Chair, press conference",
    "when": "16 Mar 2022",
    "tone": "BULL",
    "text": "Says \"the probability of a recession within the next year is not particularly elevated\". He thinks the economy can handle higher rates."
   },
   {
    "who": "Jeremy Siegel",
    "role": "Professor, Wharton School",
    "when": "3 Mar 2022",
    "tone": "MIX",
    "text": "Thinks the Fed is too slow. He wants a bigger first rise than 0.25. \"They're going to have to do much more than that.\""
   },
   {
    "who": "Mohamed El-Erian",
    "role": "Economist, Allianz",
    "when": "13 Mar 2022",
    "tone": "CAUT",
    "text": "Says \"the Fed is very late and has no good policy options available anymore\". He does not think the economy can handle seven rises."
   }
  ],
  "ask": "The Fed plans many rises, but stocks went up today. Is the bad news already in the price?",
  "after": [
   "The Fed raised rates by 0.50 in May and 0.75 in June. US inflation reached 9.1% in June, the highest since 1981.",
   "The S&P 500 hit its low close of 3,577 on 12 October 2022. By 10 March 2023, a year after today, stocks were down 11% and Bitcoin was down 51%. Bonds fell too: a fund of 7-10 year US Treasuries lost 9%, because yields rose."
  ]
 },
 {
  "n": 5,
  "date": "10 Mar 2023",
  "title": "A bank fails overnight",
  "news": [
   "California regulators closed Silicon Valley Bank (SVB) today, and the US deposit insurer (FDIC) took over. SVB had $209 billion of assets. Many tech start-ups banked there.",
   "It was a bank run. On 9 March, customers tried to withdraw about $42 billion in one day. Only the first $250,000 per depositor is insured, and nobody yet knows if the rest will be paid back.",
   "Stocks fell: the S&P 500 lost 1.5% to 3,862, and a fund of regional bank stocks lost 4.4%. Investors rushed into government bonds: the 10-year yield fell to 3.70% from 3.91% the day before.",
   "On 7 March Powell had said rates may need to go higher than planned. The Fed rate is 4.50-4.75%.",
   "Bitcoin is $20,187 and gold is $1,861."
  ],
  "views": [
   {
    "who": "Jerome Powell",
    "role": "Fed Chair, testimony to the US Senate",
    "when": "7 Mar 2023",
    "tone": "MIX",
    "text": "Says data has been stronger than expected, so rates will likely peak higher. He is ready to go faster if needed. He does not mention bank stress."
   },
   {
    "who": "Bill Ackman",
    "role": "Hedge fund manager, Pershing Square",
    "when": "9 Mar 2023",
    "tone": "CAUT",
    "text": "Warns that SVB's failure \"could destroy an important long-term driver of the economy\" and calls for a rescue."
   },
   {
    "who": "Greg Becker",
    "role": "CEO of SVB, call with investors",
    "when": "9 Mar 2023",
    "tone": "BULL",
    "text": "Asks clients to stay calm: \"We now ask you not to panic.\" The bank was closed the next day."
   }
  ],
  "ask": "A bank failed overnight. Is it one bank, or the start of a crisis? Where is your money safe?",
  "after": [
   "On Sunday 12 March a second bank, Signature Bank, was closed. The government said all SVB depositors would be paid, and the Fed created a new emergency loan program (BTFP).",
   "On 19 March UBS agreed to buy Credit Suisse. First Republic Bank failed in early May. Yet about two years later, on 2 April 2025, stocks were up 47%, Bitcoin up 309% and gold up 68%."
  ]
 },
 {
  "n": 6,
  "date": "2 Apr 2025",
  "title": "Tariff day",
  "news": [
   "This afternoon, after the stock market closed at 4 pm, the US President announced a new set of tariffs (taxes on imports) on most countries. The closing prices you see are from just BEFORE the news. In real life, prices moved the next day.",
   "A 10% tariff on all countries starts 5 April. Higher rates start 9 April: China 34% (on top of older tariffs), Taiwan 32%, Japan 24%, India 26%, the EU 20%.",
   "Before the news, the S&P 500 closed at 5,671 (+0.7%), about 8% below its February record. Gold had just set a new record of $3,149 on 1 April; its afternoon price today is $3,120.",
   "The Fed rate is 4.25-4.50%. The 10-year yield is 4.20%. Bitcoin is $82,486.",
   "Nobody knows yet how other countries will react."
  ],
  "views": [
   {
    "who": "Bruce Kasman",
    "role": "Chief global economist, J.P. Morgan",
    "when": "12 Mar 2025",
    "tone": "CAUT",
    "text": "Raises his odds of a US recession to about 40%, and says 50% or more if the April tariffs hurt fully. \"Where we stand now is with a heightened concern about the U.S. economy.\""
   },
   {
    "who": "Jerome Powell",
    "role": "Fed Chair, press conference",
    "when": "19 Mar 2025",
    "tone": "MIX",
    "text": "Says price rises from tariffs might be temporary and calls that \"kind of the base case\". The Fed keeps its rate unchanged because the effects are unclear."
   },
   {
    "who": "Goldman Sachs",
    "role": "Commodities research, gold forecast",
    "when": "26 Mar 2025",
    "tone": "BULL",
    "text": "Raises its end-2025 gold forecast to $3,300, from $3,100. It sees central-bank buying and money flowing into gold funds."
   }
  ],
  "ask": "The tariffs were announced after the close. Do you protect yourself before the market reacts, or do you wait?",
  "after": [
   "On 3 April the S&P 500 fell 4.8%, and on 4 April 6%. Its low close was 4,983 on 8 April, 19% below the February record. On 9 April the higher tariffs were paused for 90 days and the S&P jumped 9.5%. On 27 June it set a new record close.",
   "Gold kept setting records and ended 2025 near $4,368. Bitcoin hit a record of about $126,000 on 6 October, then fell to $87,509 by 31 December, about 30% below its October peak close."
  ]
 }
];
