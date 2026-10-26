/* 防詐圖卡：渲染、篩選、翻面 */

const grid = document.getElementById('grid');
const chipsEl = document.getElementById('chips');
const countEl = document.getElementById('count');
const emptyEl = document.getElementById('empty');
const searchEl = document.getElementById('q');
const flipAllBtn = document.getElementById('flipAll');
const srcListEl = document.getElementById('srclist');

const CHANNEL_NOTE = {
  line: 'LINE', sms: '簡訊', call: '電話', ad: '廣告',
  email: 'Email', web: '網頁', parcel: '包裹', video: '影片'
};

let activeGroup = 0;      // 0 = 全部
let query = '';
let allFlipped = false;

/* ---------- 篩選列 ---------- */

function renderChips() {
  const btns = [{ id: 0, name: '全部', n: SCAMS.length }].concat(
    GROUPS.map(g => ({ id: g.id, name: g.name, n: SCAMS.filter(s => s.g === g.id).length }))
  );

  chipsEl.innerHTML = '';
  btns.forEach(b => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'chip';
    el.setAttribute('aria-pressed', String(b.id === activeGroup));
    el.dataset.group = b.id;
    el.innerHTML = `${escapeHtml(b.name)}<span class="n">${b.n}</span>`;
    if (b.id > 0) el.style.setProperty('--gc', `var(--g${b.id})`);
    el.addEventListener('click', () => {
      activeGroup = b.id;
      renderChips();
      render();
    });
    chipsEl.appendChild(el);
  });
}

/* ---------- 卡片 ---------- */

function matches(s) {
  if (activeGroup && s.g !== activeGroup) return false;
  if (!query) return true;
  const hay = [s.name, s.hook, s.summary, s.tell, s.guard, s.chLabel]
    .concat(s.scripts || []).join(' ').toLowerCase();
  return hay.includes(query);
}

function cardHtml(s, i) {
  const g = GROUPS.find(x => x.id === s.g);
  const scripts = (s.scripts || []).slice(0, 3)
    .map(t => `<li>${escapeHtml(t)}</li>`).join('');
  const variants = scripts
    ? `<div class="variants"><span class="lbl">這些也是同一套</span><ul>${scripts}</ul></div>`
    : '';
  const sources = s.src
    .map(k => SRC[k])
    .filter(Boolean)
    .map(x => `<a href="${x.u}" target="_blank" rel="noopener noreferrer">${escapeHtml(x.t)}</a>`)
    .join('');

  return `
<article class="card" data-ch="${s.ch}" style="--gc: var(--g${s.g})"
         tabindex="0" role="button" aria-pressed="false"
         aria-label="第 ${s.id} 張，${escapeHtml(s.name)}。按下翻面看破解方法。">
  <div class="card-inner">

    <div class="face front">
      <p class="chan"><span class="dot"></span>${escapeHtml(s.chLabel)}</p>
      <div class="front-body">
        <p class="bubble">${escapeHtml(s.hook)}</p>
        ${variants}
      </div>
      <div class="front-foot">
        <span class="gtag">${escapeHtml(g ? g.name : '')}</span>
        <button type="button" class="flip-btn" tabindex="-1">翻面看破解 →</button>
      </div>
    </div>

    <div class="face back">
      <div class="back-scroll">
        <p class="num">NO.${String(s.id).padStart(2, '0')}　${CHANNEL_NOTE[s.ch] || ''}</p>
        <h3>${escapeHtml(s.name)}</h3>
        <p class="summary">${escapeHtml(s.summary)}</p>

        <div class="block tell">
          <span class="lbl">真正的破綻</span>${escapeHtml(s.tell)}
        </div>
        <div class="block guard">
          <span class="lbl">一句話自保</span>${escapeHtml(s.guard)}
        </div>

        ${s.stat ? `<p class="stat">${escapeHtml(s.stat)}</p>` : ''}
      </div>
      <div class="back-foot">
        <div class="sources">
          <span class="lbl">資料來源</span>
          <div class="srcs">${sources}</div>
        </div>
        <div class="back-foot-row">
          <span class="gtag">${escapeHtml(g ? g.name : '')}</span>
          <button type="button" class="flip-btn" tabindex="-1">← 回到話術</button>
        </div>
      </div>
    </div>

  </div>
</article>`;
}

function render() {
  const list = SCAMS.filter(matches);

  grid.innerHTML = list.map(cardHtml).join('');
  emptyEl.hidden = list.length > 0;

  if (allFlipped) {
    grid.querySelectorAll('.card').forEach(c => setFlipped(c, true));
  }

  const scope = activeGroup
    ? (GROUPS.find(g => g.id === activeGroup) || {}).name
    : '全部';
  const brk = activeGroup ? (GROUPS.find(g => g.id === activeGroup) || {}).break : '';
  countEl.textContent = brk
    ? `${scope}　${list.length} 張　心理破口：${brk}`
    : `${scope}　${list.length} 張`;
}

/* ---------- 翻面 ---------- */

function setFlipped(card, on) {
  card.classList.toggle('is-flipped', on);
  card.setAttribute('aria-pressed', String(on));
}

grid.addEventListener('click', e => {
  if (e.target.closest('a')) return;              // 點來源連結不翻面
  const card = e.target.closest('.card');
  if (!card) return;
  setFlipped(card, !card.classList.contains('is-flipped'));
});

grid.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.card');
  if (!card || e.target !== card) return;
  e.preventDefault();
  setFlipped(card, !card.classList.contains('is-flipped'));
});

flipAllBtn.addEventListener('click', () => {
  allFlipped = !allFlipped;
  flipAllBtn.setAttribute('aria-pressed', String(allFlipped));
  flipAllBtn.textContent = allFlipped ? '全部收回' : '全部翻面';
  grid.querySelectorAll('.card').forEach(c => setFlipped(c, allFlipped));
});

/* ---------- 搜尋 ---------- */

let t;
searchEl.addEventListener('input', () => {
  clearTimeout(t);
  t = setTimeout(() => {
    query = searchEl.value.trim().toLowerCase();
    render();
  }, 150);
});

/* ---------- 頁尾來源總表 ---------- */

function renderSources() {
  srcListEl.innerHTML = Object.values(SRC)
    .map(x => `<li><a href="${x.u}" target="_blank" rel="noopener noreferrer">${escapeHtml(x.t)}</a></li>`)
    .join('');
}

/* ---------- utils ---------- */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

renderChips();
renderSources();
render();
