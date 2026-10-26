/* 詐騙犯角色系統
   一套零件組合出 35 個角色，不依賴任何外部圖檔。
   每張卡在 data.js 用 char: { eyes, mouth, hat, wear, prop } 指定組合。

   設計意圖：角色放在卡片正面，當作那則訊息的「寄件人頭像」。
   畫得親切是刻意的 —— 詐騙犯不會長得像壞人，那正是重點。
   卡片背面不放角色，維持嚴肅。 */

const INK = 'var(--face-ink)';
const SKIN = 'var(--face-skin)';
const HAIR = 'var(--face-hair)';
const GC = 'var(--gc)';

/* ---------- 眼睛 ---------- */

const EYES = {
  // 睜大，純真無害
  wide: `
    <circle cx="29" cy="31" r="4.4" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="43" cy="31" r="4.4" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="29.6" cy="31.6" r="2.3" fill="${INK}"/>
    <circle cx="43.6" cy="31.6" r="2.3" fill="${INK}"/>`,

  // 眼神飄移，瞳孔都偏向同一側
  shifty: `
    <ellipse cx="29" cy="31" rx="4.6" ry="4" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
    <ellipse cx="43" cy="31" rx="4.6" ry="4" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="31.4" cy="31.4" r="2.1" fill="${INK}"/>
    <circle cx="45.4" cy="31.4" r="2.1" fill="${INK}"/>`,

  // 瞇眼笑，看起來最無害
  closed: `
    <path d="M25 32.5 q4 -5 8.4 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
    <path d="M38.6 32.5 q4 -5 8.4 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`,

  // 眨眼
  wink: `
    <path d="M25 32 q4 -4.5 8.4 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="43" cy="31" r="4.2" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="43.4" cy="31.4" r="2.2" fill="${INK}"/>`,

  // 星星眼，被利益沖昏頭的那種熱情
  sparkle: `
    <circle cx="29" cy="31" r="4.4" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="43" cy="31" r="4.4" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="29.4" cy="31.4" r="2.3" fill="${INK}"/>
    <circle cx="43.4" cy="31.4" r="2.3" fill="${INK}"/>
    <path d="M27.6 29.2 l.7 1.4 1.4 .7 -1.4 .7 -.7 1.4 -.7 -1.4 -1.4 -.7 1.4 -.7z" fill="#fff"/>
    <path d="M41.6 29.2 l.7 1.4 1.4 .7 -1.4 .7 -.7 1.4 -.7 -1.4 -1.4 -.7 1.4 -.7z" fill="#fff"/>`,

  // 錢眼
  money: `
    <circle cx="29" cy="31" r="4.6" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
    <circle cx="43" cy="31" r="4.6" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
    <text x="29" y="34.4" text-anchor="middle" font-size="7.5" font-weight="800" fill="${INK}" font-family="system-ui, sans-serif">$</text>
    <text x="43" y="34.4" text-anchor="middle" font-size="7.5" font-weight="800" fill="${INK}" font-family="system-ui, sans-serif">$</text>`,

  // 墨鏡，看不到眼睛
  shades: `
    <path d="M21 28.5 h30 v2 h-30z" fill="${INK}"/>
    <rect x="22" y="29" width="12" height="8.5" rx="3" fill="${INK}"/>
    <rect x="38" y="29" width="12" height="8.5" rx="3" fill="${INK}"/>
    <path d="M34 32 h4" stroke="${INK}" stroke-width="1.6"/>
    <path d="M24.5 31.5 l3 -1" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>`,

  // 金框眼鏡，營造專業形象
  glasses: `
    <circle cx="29" cy="31" r="3.4" fill="#fff" stroke="${INK}" stroke-width="1.3"/>
    <circle cx="43" cy="31" r="3.4" fill="#fff" stroke="${INK}" stroke-width="1.3"/>
    <circle cx="29.3" cy="31.3" r="1.8" fill="${INK}"/>
    <circle cx="43.3" cy="31.3" r="1.8" fill="${INK}"/>
    <circle cx="29" cy="31" r="6.4" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="43" cy="31" r="6.4" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <path d="M35.4 31 h1.2" stroke="${INK}" stroke-width="1.5"/>
    <path d="M22.6 30 l-3 -1.4M49.4 30 l3 -1.4" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`
};

/* ---------- 嘴巴 ---------- */

const MOUTH = {
  grin: `<path d="M29 39.5 q7 7.5 14 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`,
  teeth: `<path d="M29 39 q7 8 14 0 z" fill="#fff" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M30.6 40.6 h10.8" stroke="${INK}" stroke-width="1.3"/>`,
  smirk: `<path d="M31 41 q5.5 3.6 10 -2.2" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`,
  flat: `<path d="M31 40.5 h10" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`,
  o: `<ellipse cx="36" cy="40.5" rx="3" ry="3.6" fill="${INK}"/>`
};

/* ---------- 頭頂 ---------- */

const HAT = {
  none: `<path d="M21 26 q3 -13 15 -12.5 q12 -.5 15 12.5 q-15 -6.5 -30 0z" fill="${HAIR}"/>`,

  cap: `<path d="M20 25 q4 -13 16 -13 q12 0 16 13z" fill="${GC}"/>
        <path d="M20 24.4 h20 a3 3 0 0 1 0 3.6 h-20z" fill="${GC}" opacity=".72"/>
        <circle cx="36" cy="13.4" r="2" fill="${GC}"/>`,

  police: `<path d="M21 24 q4 -12 15 -12 q11 0 15 12z" fill="${GC}"/>
           <rect x="18" y="23.2" width="36" height="4.4" rx="2.2" fill="${INK}" opacity=".82"/>
           <path d="M36 14 l1.9 3.9 4.3 .6 -3.1 3 .7 4.3 -3.8 -2 -3.8 2 .7 -4.3 -3.1 -3 4.3 -.6z" fill="#f2c438"/>`,

  crown: `<path d="M23 25 l1.5 -11 6.5 6 5 -8.5 5 8.5 6.5 -6 1.5 11z" fill="#eab308" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
          <circle cx="36" cy="16.5" r="1.7" fill="#fff"/>`,

  hood: `<path d="M16 42 q-1 -30 20 -30 q21 0 20 30 q-6 -16 -20 -16 q-14 0 -20 16z" fill="${GC}"/>
         <path d="M21 26 q3 -11 15 -11 q12 0 15 11 q-15 -6 -30 0z" fill="${HAIR}" opacity=".55"/>`,

  headset: `<path d="M21 26 q3 -13 15 -12.5 q12 -.5 15 12.5 q-15 -6.5 -30 0z" fill="${HAIR}"/>
            <path d="M19 32 q0 -18 17 -18 q17 0 17 18" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
            <rect x="15.4" y="28" width="6.4" height="10" rx="3" fill="${GC}" stroke="${INK}" stroke-width="1.4"/>
            <rect x="50.2" y="28" width="6.4" height="10" rx="3" fill="${GC}" stroke="${INK}" stroke-width="1.4"/>
            <path d="M18.6 38 q0 8 9 8.6" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="28.4" cy="46.8" r="2.1" fill="${GC}" stroke="${INK}" stroke-width="1.3"/>`
};

/* ---------- 臉部配件 ---------- */

const WEAR = {
  none: '',
  // 口罩，遮住嘴（指定 mask 時不畫嘴巴）
  mask: `<path d="M24 35 q12 -3 24 0 v4 q0 9 -12 10.5 q-12 -1.5 -12 -10.5z" fill="#e6f1f5" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
         <path d="M24 36.5 l-6 -2.6M48 36.5 l6 -2.6" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>
         <path d="M27 41 q9 -2 18 0" fill="none" stroke="${INK}" stroke-width="1.1" opacity=".45"/>`,
  // 正在掀開的另一張臉，用在 AI 深偽
  ai: `<path d="M36 17 q15 0 15 15 q0 13 -15 18 q-2 -16 -2 -33z" fill="#fff" opacity=".9" stroke="${INK}" stroke-width="1.5"/>
       <path d="M36 17 q-2 16 -2 33" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="2.6 2.6"/>
       <circle cx="43" cy="31" r="2.4" fill="${INK}"/>
       <path d="M40.5 41 q4 2.4 7 -1" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round"/>`,
  // 領帶，營造專業形象。畫在領口以下，不要壓到下巴
  tie: `<path d="M29.5 55.5 L36 61.5 L42.5 55.5" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
        <path d="M36 58.6 l-2.6 2 2.6 1.7 2.6 -1.7z" fill="#d94f3d" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M36 62.3 l-2.6 1.6 1.3 6.5 1.3 1.6 1.3 -1.6 1.3 -6.5z" fill="#d94f3d" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/>`
};

/* ---------- 手上的道具 ---------- */

const PROP = {
  phone: `<rect x="-6" y="-9" width="12" height="18" rx="2.6" fill="#fff" stroke="${INK}" stroke-width="1.6"/>
          <rect x="-4" y="-6.4" width="8" height="11" rx="1" fill="${GC}" opacity=".5"/>
          <circle cx="0" cy="6.4" r="1.2" fill="${INK}"/>`,
  envelope: `<rect x="-9" y="-6.5" width="18" height="13" rx="1.8" fill="#fff" stroke="${INK}" stroke-width="1.6"/>
             <path d="M-9 -5.6 L0 1.4 9 -5.6" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`,
  box: `<rect x="-8.5" y="-7" width="17" height="14" rx="1.6" fill="#e2bd8c" stroke="${INK}" stroke-width="1.6"/>
        <path d="M-8.5 -2.4 h17M0 -7 v14" stroke="${INK}" stroke-width="1.4"/>`,
  card: `<rect x="-9.5" y="-6" width="19" height="12" rx="2" fill="#fff" stroke="${INK}" stroke-width="1.6"/>
         <rect x="-9.5" y="-3.4" width="19" height="3" fill="${INK}"/>
         <rect x="-7" y="2" width="6" height="2" rx="1" fill="${GC}"/>`,
  heart: `<path d="M0 7.5 C-9 1.5 -8.5 -6 -3.6 -6 -1.2 -6 0 -4 0 -4 0 -4 1.2 -6 3.6 -6 8.5 -6 9 1.5 0 7.5z" fill="#e05a73" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`,
  coin: `<circle cx="0" cy="0" r="8" fill="#eab308" stroke="${INK}" stroke-width="1.6"/>
         <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="800" fill="${INK}" font-family="system-ui, sans-serif">$</text>`,
  moneybag: `<path d="M-7.5 8 q-1.5 -11 4 -13 h7 q5.5 2 4 13z" fill="#d8b24a" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
             <path d="M-4 -5.4 q4 -2.6 8 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
             <text x="0" y="5" text-anchor="middle" font-size="8.5" font-weight="800" fill="${INK}" font-family="system-ui, sans-serif">$</text>`,
  chart: `<rect x="-9" y="-8" width="18" height="16" rx="2" fill="#fff" stroke="${INK}" stroke-width="1.6"/>
          <path d="M-5.6 4 v-4M-1.4 4 v-7.4M2.8 4 v-2.6M7 4 v-9" stroke="#d94f3d" stroke-width="2.1" stroke-linecap="round"/>`,
  doc: `<path d="M-7 -8.5 h10 l4 4 v13 h-14z" fill="#fff" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M3 -8.5 v4 h4" fill="none" stroke="${INK}" stroke-width="1.4"/>
        <path d="M-4 1 h8M-4 4.4 h8" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>`,
  gift: `<rect x="-8.5" y="-4.5" width="17" height="12" rx="1.6" fill="${GC}" stroke="${INK}" stroke-width="1.6"/>
         <rect x="-9.5" y="-8" width="19" height="4.4" rx="1.6" fill="${GC}" stroke="${INK}" stroke-width="1.6"/>
         <path d="M0 -8 v15.5" stroke="${INK}" stroke-width="1.5"/>
         <path d="M0 -8 q-6 -6 -2.6 -1.4M0 -8 q6 -6 2.6 -1.4" fill="none" stroke="${INK}" stroke-width="1.5"/>`,
  dice: `<rect x="-8" y="-8" width="16" height="16" rx="3.2" fill="#fff" stroke="${INK}" stroke-width="1.6"/>
         <circle cx="-3.6" cy="-3.6" r="1.6" fill="${INK}"/>
         <circle cx="3.6" cy="3.6" r="1.6" fill="${INK}"/>
         <circle cx="0" cy="0" r="1.6" fill="${INK}"/>`,
  mic: `<rect x="-3.6" y="-9" width="7.2" height="11.5" rx="3.6" fill="${INK}"/>
        <path d="M-6.4 0 q0 6 6.4 6 q6.4 0 6.4 -6" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round"/>
        <path d="M0 6 v3.4" stroke="${INK}" stroke-width="1.7" stroke-linecap="round"/>`
};

/* ---------- 每張卡的角色組合 ---------- */

const FACES = {
  1:  { eyes: 'money',   mouth: 'grin',  hat: 'none',    wear: 'tie',  prop: 'chart' },
  2:  { eyes: 'money',   mouth: 'smirk', hat: 'cap',     wear: 'none', prop: 'coin' },
  3:  { eyes: 'sparkle', mouth: 'teeth', hat: 'none',    wear: 'none', prop: 'mic' },
  4:  { eyes: 'wink',    mouth: 'grin',  hat: 'none',    wear: 'tie',  prop: 'doc' },
  5:  { eyes: 'shifty',  mouth: 'smirk', hat: 'none',    wear: 'tie',  prop: 'moneybag' },
  6:  { eyes: 'shifty',  mouth: 'flat',  hat: 'hood',    wear: 'none', prop: 'card' },

  7:  { eyes: 'sparkle', mouth: 'smirk', hat: 'none',    wear: 'none', prop: 'heart' },
  8:  { eyes: 'sparkle', mouth: 'grin',  hat: 'none',    wear: 'tie',  prop: 'gift' },
  9:  { eyes: 'wink',    mouth: 'smirk', hat: 'none',    wear: 'none', prop: 'coin' },
  10: { eyes: 'shades',  mouth: 'flat',  hat: 'hood',    wear: 'none', prop: 'phone' },

  11: { eyes: 'wide',    mouth: 'teeth', hat: 'cap',     wear: 'none', prop: 'box' },
  12: { eyes: 'shifty',  mouth: 'smirk', hat: 'cap',     wear: 'none', prop: 'phone' },
  13: { eyes: 'closed',  mouth: 'grin',  hat: 'cap',     wear: 'none', prop: 'box' },
  14: { eyes: 'wink',    mouth: 'smirk', hat: 'cap',     wear: 'none', prop: 'doc' },
  15: { eyes: 'wide',    mouth: 'o',     hat: 'none',    wear: 'none', prop: 'coin' },

  16: { eyes: 'wide',    mouth: 'flat',  hat: 'police',  wear: 'none', prop: 'doc' },
  17: { eyes: 'closed',  mouth: 'grin',  hat: 'cap',     wear: 'tie',  prop: 'phone' },
  18: { eyes: 'shifty',  mouth: 'smirk', hat: 'headset', wear: 'none', prop: 'phone' },
  19: { eyes: 'glasses', mouth: 'flat',  hat: 'none',    wear: 'tie',  prop: 'envelope' },

  20: { eyes: 'money',   mouth: 'teeth', hat: 'none',    wear: 'none', prop: 'dice' },
  21: { eyes: 'sparkle', mouth: 'grin',  hat: 'headset', wear: 'none', prop: 'gift' },

  22: { eyes: 'closed',  mouth: 'grin',  hat: 'headset', wear: 'none', prop: 'phone' },

  23: { eyes: 'shifty',  mouth: 'flat',  hat: 'hood',    wear: 'none', prop: 'envelope' },
  24: { eyes: 'closed',  mouth: 'grin',  hat: 'none',    wear: 'tie',  prop: 'envelope' },
  25: { eyes: 'glasses', mouth: 'smirk', hat: 'none',    wear: 'tie',  prop: 'doc' },
  26: { eyes: 'money',   mouth: 'smirk', hat: 'none',    wear: 'none', prop: 'card' },

  27: { eyes: 'wink',    mouth: 'grin',  hat: 'none',    wear: 'mask', prop: 'phone' },
  28: { eyes: 'closed',  mouth: 'grin',  hat: 'none',    wear: 'mask', prop: 'phone' },

  29: { eyes: 'sparkle', mouth: 'grin',  hat: 'none',    wear: 'none', prop: 'heart' },

  30: { eyes: 'wide',    mouth: 'flat',  hat: 'none',    wear: 'ai',   prop: 'phone' },

  31: { eyes: 'shifty',  mouth: 'smirk', hat: 'none',    wear: 'tie',  prop: 'envelope' },
  32: { eyes: 'sparkle', mouth: 'teeth', hat: 'crown',   wear: 'none', prop: 'gift' },
  33: { eyes: 'closed',  mouth: 'smirk', hat: 'none',    wear: 'tie',  prop: 'doc' },
  34: { eyes: 'wink',    mouth: 'grin',  hat: 'cap',     wear: 'none', prop: 'doc' },
  35: { eyes: 'shifty',  mouth: 'flat',  hat: 'headset', wear: 'none', prop: 'card' }
};

/* ---------- 組裝 ---------- */

// 膚色與髮色依卡號輪替，讓 35 個角色看起來是一群人，而不是同一個人換帽子。
// 乘上質數再取餘數，純粹是為了讓相鄰卡片不會連續同色。
const SKINS = ['#f7d2ae', '#eabb92', '#d59a6d'];
const HAIRS = ['#4a3a2f', '#2b2420', '#6d4a33'];

function scamFace(id) {
  const c = FACES[id] || { eyes: 'wide', mouth: 'smirk', hat: 'none', wear: 'none', prop: 'phone' };

  // 口罩和 AI 面具會蓋住嘴巴，就不畫嘴
  const covered = c.wear === 'mask' || c.wear === 'ai';

  const skin = SKINS[(id * 7) % SKINS.length];
  const hair = HAIRS[(id * 5) % HAIRS.length];

  return `
<svg class="face-svg" viewBox="0 0 72 72" role="img" aria-hidden="true" focusable="false"
     style="--face-skin:${skin};--face-hair:${hair}">
  <circle cx="36" cy="36" r="35" fill="${GC}" opacity=".13"/>

  <!-- 肩膀 -->
  <path d="M13 72 q2 -17 23 -17 q21 0 23 17z" fill="${GC}"/>
  <path d="M30 50 h12 v7 q-6 3 -12 0z" fill="${SKIN}"/>

  <!-- 臉 -->
  <ellipse cx="36" cy="33" rx="16.5" ry="15.5" fill="${SKIN}"/>
  <ellipse cx="19.8" cy="35" rx="2.8" ry="3.4" fill="${SKIN}"/>
  <ellipse cx="52.2" cy="35" rx="2.8" ry="3.4" fill="${SKIN}"/>

  ${HAT[c.hat] || HAT.none}
  ${EYES[c.eyes] || EYES.wide}
  ${covered ? '' : (MOUTH[c.mouth] || MOUTH.smirk)}
  ${WEAR[c.wear] || ''}

  <!-- 道具 -->
  <g transform="translate(52,52) scale(.8)">${PROP[c.prop] || PROP.phone}</g>
</svg>`;
}
