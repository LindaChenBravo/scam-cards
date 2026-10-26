# 這句話，你聽過嗎？｜35 種詐騙話術圖鑑

正面是你真的會收到的那一句話，翻面才是詐騙名稱、破綻與自保方法。每張卡都附資料來源。

## 結構

```
scam-cards/
├── wrangler.jsonc        # 獨立部署設定（與根目錄的番茄鐘互不影響）
├── data/
│   └── scam-types.md     # 研究資料與排序方法說明（由 data.js 自動生成）
└── public/               # 部署目錄
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── characters.js     # 詐騙犯角色（純 SVG，無外部圖檔）
    └── data.js           # 35 張卡的內容，改文案只要動這一支
```

## 本機預覽

```
python3 -m http.server 8788 --directory scam-cards/public
```

## 部署

```
cd scam-cards && npx wrangler deploy
```

## 改內容

全部集中在 `public/data.js`：

- `SRC` — 資料來源總表，卡片用代號引用
- `GROUPS` — 10 個心理破口分群（含 DailyView 聲量）
- `SCAMS` — 35 張卡

每張卡的欄位：

| 欄位 | 出現在 | 說明 |
|---|---|---|
| `hook` | 正面 | 卡片正面那句話術，建議 30 字內（超過會擠壓版面） |
| `ch` / `chLabel` | 正面 | 管道（line / sms / call / ad / email / web / parcel / video）與顯示文字 |
| `scripts` | 正面 | 同一套的其他話術，**只顯示前 3 則**，多寫的仍可被搜尋到 |
| `summary` | 背面 | 一句話定義 |
| `tell` | 背面 | 真正的破綻 |
| `guard` | 背面 | 一句話自保 |
| `stat` | 背面 | 數據佐證 |
| `src` | 背面 | 資料來源代號陣列，對應 `SRC`，釘在卡背底部不會被捲動蓋住 |

卡片正反面等高（`--card-h`，桌機 560px、手機 570px）。加長文案前先確認背面不會溢出：
開發者工具 Console 執行

```js
[...document.querySelectorAll('.back-scroll')].filter(s => s.scrollHeight > s.clientHeight).length
```

結果應為 `0`。若不為 0，縮短 `summary` 或 `tell`，或調高 `--card-h`。

## 角色

每張卡正面的頭像是那則訊息的「寄件人」。畫得親切是刻意的 —— 詐騙犯不會長得像壞人，那正是這個網站想講的事。卡片背面不放角色，維持嚴肅。

35 個角色不是 35 張圖，而是 `characters.js` 裡的零件組合，全部是行內 SVG，沒有任何外部圖檔：

| 零件 | 可選值 |
|---|---|
| `eyes` | wide、shifty、closed、wink、sparkle、money、shades、glasses |
| `mouth` | grin、teeth、smirk、flat、o |
| `hat` | none、cap、police、crown、hood、headset |
| `wear` | none、tie、mask（口罩）、ai（半張 AI 面具） |
| `prop` | phone、envelope、box、card、heart、coin、moneybag、chart、doc、gift、dice、mic |

改某張卡的角色，就改 `characters.js` 裡 `FACES` 對應卡號的那一行。膚色與髮色依卡號自動輪替，不用手動指定。

`wear` 設成 `mask` 或 `ai` 時會自動不畫嘴巴，避免疊圖。

新增角色後可在 Console 檢查有沒有兩張卡長得一模一樣：

```js
const sig = id => Object.values(FACES[id]).join('|');
const seen = {}; Object.keys(FACES).forEach(i => { const k = sig(i); if (seen[k]) console.warn(seen[k], '與', i, '撞臉'); else seen[k] = i; });
```

## 資料

- 話術引自內政部警政署 165 打詐儀錶板「詐騙手法」官方頁面
- 件數與財損為民國 115 年 9 月（2026 年 9 月）月統計
- 聲量為網路溫度計 DailyView × KEYPO，2026/1/1–5/7

165 數據逐月更新，若要長期維護，建議定期更新 `stat` 欄位與頁尾整理日期。
