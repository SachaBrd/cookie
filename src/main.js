import { SPRITES, ICONS, draw, drawPlain } from './art.js';
import * as sound from './sound.js';
import {
  CHARACTERS, ITEMS, QUESTS, MAX_LEVEL, newState, load, level, charXp, isUnlocked, reached, nextMilestone,
  stats, click, tick, rates, hire, itemLevel, itemPrice, buyItem, questLevel, questPrice, buyQuest,
} from './logic.js';

const SAVE_KEY = 'lesplusforts-save';
const MUTE_KEY = 'lesplusforts-muted';
const SOUND = { sacha: sound.note, anthea: sound.bling, alix: sound.clay, tim: sound.printer, cats: sound.meow, merlin: sound.kick, elsa: sound.ding, isa: sound.scribble, maelie: sound.whoosh, julien: sound.laser, marie: sound.page, isis: sound.notif, yvan: sound.drill, marc: sound.splash };

let state = load(localStorage.getItem(SAVE_KEY) ?? localStorage.getItem('magicarc-save')); // keep saves from before the rename
let muted = localStorage.getItem(MUTE_KEY) === '1';
const $ = (id) => document.getElementById(id);
const byId = (id) => CHARACTERS.find((c) => c.id === id);

// French formatting: 1,5 / 950 / 94,9k / 12,3M / 4,2Md ...
const SUFFIX = ['', 'k', 'M', 'Md', 'Bn'];
function fmt(n) {
  if (n < 1000) return n.toLocaleString('fr', { maximumFractionDigits: n < 10 ? 2 : 0 });
  const i = Math.min(Math.floor(Math.log10(n) / 3), 4);
  if (i === 4 && n >= 1e15) return n.toExponential(2).replace('+', '');
  return (n / 1000 ** i).toLocaleString('fr', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + SUFFIX[i];
}

function paintIcon(canvas, name) {
  canvas.width = canvas.height = 8;
  canvas.classList.add('icon');
  draw(canvas.getContext('2d'), ICONS[name]);
}
document.querySelectorAll('canvas[data-icon]').forEach((cv) => paintIcon(cv, cv.dataset.icon));

// ---- Characters: one card each, built once; render() only updates text so buttons stay clickable.
const cards = CHARACTERS.map((c) => {
  const el = $('card').content.firstElementChild.cloneNode(true);
  const q = (sel) => el.querySelector(sel);
  q('[data-name]').textContent = c.name;
  q('[data-sprite]').setAttribute('aria-label', `${c.name} : ${c.verb}`);
  const canvas = q('canvas');
  const scale = SPRITES[c.id].scale ?? 1; // Marc Anthony is shown at 2x
  canvas.style.width = `calc(${canvas.width * scale} * var(--sprite-px))`;
  canvas.style.height = `calc(${canvas.height * scale} * var(--sprite-px))`;
  const ctx = canvas.getContext('2d');
  draw(ctx, SPRITES[c.id].idle);
  const card = { c, el, ctx, timer: 0, pending: 0, q };
  q('[data-sprite]').addEventListener('click', () => {
    if (!level(state, c)) return;
    perform(card, 1, true);
    click(state, c);
    render();
  });
  q('[data-buy]').addEventListener('click', () => { hire(state, c); render(); });
  $('characters').append(el);
  return card;
});

// Visual + sound feedback for one action (click or passive).
function perform(card, volume, isClick = false) {
  const { c, ctx, q } = card;
  const st = stats(state, c);
  if (!muted) SOUND[c.id](volume);
  draw(ctx, SPRITES[c.id].act);
  clearTimeout(card.timer);
  card.timer = setTimeout(() => draw(ctx, SPRITES[c.id].idle), 120);
  const pop = document.createElement('span');
  pop.className = 'pop';
  pop.textContent = `+${fmt(isClick ? st.clickGold : st.gold)} or +${fmt(st.xp)} xp`;
  pop.style.left = `${10 + Math.random() * 40}%`;
  pop.addEventListener('animationend', () => pop.remove());
  q('[data-sprite]').append(pop);
}

// ---- Shop / quest panels: one row per entry, built once.
function makeRows(listId, entries, costIcon, onClick, tipText) {
  return entries.map((d) => {
    const li = $('row').content.firstElementChild.cloneNode(true);
    const q = (sel) => li.querySelector(sel);
    paintIcon(q('[data-row-icon]'), d.icon);
    paintIcon(q('[data-cost-icon]'), costIcon);
    q('[data-title]').textContent = d.name;
    const btn = q('button');
    btn.addEventListener('click', () => { onClick(d); render(); showTip(tipText(d)); });
    // Side tooltip, like a description box next to the list.
    const show = () => showTip(tipText(d));
    li.addEventListener('pointerenter', show);
    li.addEventListener('focusin', show);
    li.addEventListener('pointerleave', hideTip);
    li.addEventListener('focusout', hideTip);
    $(listId).append(li);
    return { d, li, btn, lvl: q('[data-lvl]'), cost: q('[data-cost]') };
  });
}
const showTip = (text) => { $('tip').textContent = text; $('tip').hidden = false; };
const hideTip = () => { $('tip').hidden = true; };

const shopRows = makeRows('shop-list', ITEMS, 'coin', (it) => buyItem(state, it),
  (it) => `${it.text}\nNiveau ${itemLevel(state, it)} / ${MAX_LEVEL}.`);
const questRows = makeRows('quest-list', QUESTS, 'star', (q) => buyQuest(state, q), (q) => {
  const c = byId(q.char), lv = questLevel(state, q), unit = `${c.unit}s/s`;
  const now = `${q.text}.\nNiveau ${lv} : ${fmt(q.rate * lv)} ${unit}`;
  if (lv >= MAX_LEVEL) return `${now}\nNiveau maximum atteint.`;
  const up = level(state, c) < MAX_LEVEL ? `Fait monter ${c.name} d’un niveau.` : `${c.name} est déjà au niveau maximum (${MAX_LEVEL}) : ce niveau augmente seulement la vitesse.`;
  return `${now}\nNiveau suivant : ${fmt(q.rate * (lv + 1))} ${unit}\n${up}`;
});

let openPanel = null;
function toggle(name) {
  openPanel = openPanel === name ? null : name;
  $('drop').hidden = !openPanel;
  hideTip();
  for (const tab of document.querySelectorAll('.tab[data-panel]')) {
    const on = tab.dataset.panel === openPanel;
    tab.setAttribute('aria-expanded', on);
    $(`panel-${tab.dataset.panel}`).hidden = !on;
  }
}
document.querySelectorAll('.tab[data-panel]').forEach((tab) => tab.addEventListener('click', () => toggle(tab.dataset.panel)));
addEventListener('keydown', (e) => { if (e.key === 'Escape' && openPanel) toggle(openPanel); });

function render() {
  $('gold').textContent = fmt(state.gold);
  $('xp').textContent = fmt(state.xp);
  const rt = rates(state);
  $('gold-box').title = `${fmt(rt.gold)} or/s · ${fmt(rt.xp)} xp/s en passif`;
  $('mute').setAttribute('aria-pressed', !muted);

  let next = null;
  for (const { c, el, q } of cards) {
    el.hidden = !isUnlocked(state, c);
    if (el.hidden) { next ??= c; continue; }
    const lv = level(state, c), st = stats(state, c);
    q('[data-level]').textContent = lv ? `Niv. ${lv}/${MAX_LEVEL}` : 'À recruter';
    q('[data-sprite]').disabled = !lv;
    q('[data-stats]').textContent = lv
      ? `+${fmt(st.clickGold)} or, +${fmt(st.xp)} xp par clic` + (st.auto ? ` · ${fmt(st.auto)} ${c.unit}s/s en autonomie` : '')
      : `Recrutez pour commencer : +${c.reward.gold} or, +${c.reward.xp} xp par ${c.unit}`;
    q('[data-buy]').hidden = !!lv;
    q('[data-buy]').textContent = `Recruter — ${fmt(c.cost)} or`;
    q('[data-buy]').disabled = state.gold < c.cost;
    const done = reached(state, c), up = nextMilestone(state, c);
    q('[data-milestones]').innerHTML =
      done.map((m) => `<li class="done">✓ ${m.text}</li>`).join('') +
      (up ? `<li>${fmt(charXp(state, c))} / ${fmt(up.xp)} xp — ${up.text}</li>` : '');
  }
  $('next').textContent = next ? `${next.name} arrive à ${fmt(next.unlockXp)} xp au total (${fmt(state.totalXp)} pour l’instant)` : '';
  $('next').hidden = !next;

  for (const { d: it, li, btn, lvl, cost } of shopRows) {
    li.hidden = !isUnlocked(state, byId(it.char));
    const maxed = itemLevel(state, it) >= MAX_LEVEL;
    lvl.textContent = `${itemLevel(state, it)}/${MAX_LEVEL}`;
    cost.textContent = maxed ? '—' : fmt(itemPrice(state, it));
    btn.textContent = maxed ? 'Max' : 'Acheter';
    btn.disabled = maxed || state.gold < itemPrice(state, it);
  }
  let ready = 0;
  for (const { d: q, li, btn, lvl, cost } of questRows) {
    li.hidden = !state.hired[q.char];
    const maxed = questLevel(state, q) >= MAX_LEVEL;
    lvl.textContent = `${questLevel(state, q)}/${MAX_LEVEL}`;
    cost.textContent = maxed ? '—' : fmt(questPrice(state, q));
    btn.textContent = maxed ? 'Max' : 'Acheter';
    btn.disabled = maxed || state.xp < questPrice(state, q);
    if (!li.hidden && !btn.disabled) ready++;
  }
  $('quest-badge').hidden = !ready;
  $('quest-badge').textContent = ready;
}

const save = () => localStorage.setItem(SAVE_KEY, JSON.stringify(state));

$('mute').addEventListener('click', () => {
  muted = !muted;
  localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
  render();
});
$('save').addEventListener('click', () => {
  save();
  $('save').classList.add('flash');
  setTimeout(() => $('save').classList.remove('flash'), 400);
});
$('reset').addEventListener('click', () => {
  if (confirm('Effacer votre progression ?')) { state = newState(); save(); render(); }
});

// Background: redraw the plain at 1 canvas pixel = PIXEL css px whenever the window resizes.
const PIXEL = 4;
const bg = $('scene');
let clouds = [];
function paintScene() {
  bg.width = Math.ceil(innerWidth / PIXEL);
  bg.height = Math.ceil(innerHeight / PIXEL);
  ({ clouds } = drawPlain(bg.getContext('2d'), bg.width, bg.height));
}

// Secret dev cheat: click the leftmost cloud for +100k gold and xp.
// Only on localhost or with ?debug in the URL, so players of the deployed game don't stumble on it.
const DEBUG = ['localhost', '127.0.0.1'].includes(location.hostname) || new URLSearchParams(location.search).has('debug');
if (DEBUG) addEventListener('click', (e) => {
  if (e.target.closest('button, .box') || $('game').hidden) return; // only clicks on the bare scenery
  const c = clouds.reduce((a, b) => (b.x < a.x ? b : a), clouds[0]);
  const x = e.clientX / PIXEL, y = e.clientY / PIXEL;
  if (!c || x < c.x || x > c.x + c.w || y < c.y || y > c.y + c.h) return;
  state.gold += 1e5; state.totalGold += 1e5;
  state.xp += 1e5; state.totalXp += 1e5;
  const pop = document.createElement('span');
  pop.className = 'pop';
  pop.textContent = 'DEBUG +100k or +100k xp';
  Object.assign(pop.style, { position: 'fixed', left: `${e.clientX}px`, top: `${e.clientY}px` });
  pop.addEventListener('animationend', () => pop.remove());
  document.body.append(pop);
  render();
});
addEventListener('resize', paintScene);
paintScene();
render();

// The game (and passive income) only runs once the player presses Begin.
$('begin').addEventListener('click', () => {
  $('start').hidden = true;
  $('game').hidden = false;
  let last = performance.now();
  setInterval(() => {
    const now = performance.now(), dt = (now - last) / 1000;
    last = now;
    tick(state, dt);
    // Passive actions: animate once per whole action, at most 2/s per character so fast
    // characters don't turn into noise (income is still counted in full by tick()).
    for (const card of cards) {
      card.pending = Math.min(card.pending + Math.min(stats(state, card.c).auto, 2) * dt, 2);
      if (card.pending >= 1) { card.pending -= 1; perform(card, 0.4); }
    }
    render();
  }, 100);
  setInterval(save, 5000);
  addEventListener('beforeunload', save);
}, { once: true });
