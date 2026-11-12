// Pure game logic: no DOM here, so it can be tested with `node --test`.

// reward: gold/xp per action at level 1. cost: gold to hire. Level = 1 + quest level once hired.
// milestones: cosmetic titles reached when the character has personally earned `xp` (no gameplay effect).
// Passive income only comes from quests.
export const CHARACTERS = [
  {
    id: 'sacha', name: 'Sacha', verb: 'jouer une note', unit: 'note',
    reward: { gold: 1, xp: 1 }, cost: 10, unlockXp: 0,
    milestones: [
      { xp: 250, text: 'Pédale de distorsion' },
      { xp: 1000, text: 'Bœufs entre amis' },
      { xp: 5000, text: 'Tête d’affiche' },
    ],
  },
  {
    id: 'anthea', name: 'Anthea', verb: 'jouer en ligne', unit: 'partie',
    reward: { gold: 2, xp: 4 }, cost: 300, unlockXp: 500,
    milestones: [
      { xp: 250, text: 'Premier donjon' },
      { xp: 1000, text: 'Monture épique' },
      { xp: 5000, text: 'Guilde légendaire' },
    ],
  },
  {
    id: 'alix', name: 'Alix', verb: 'façonner un pot', unit: 'pot',
    reward: { gold: 6, xp: 3 }, cost: 2000, unlockXp: 3000,
    milestones: [
      { xp: 250, text: 'Émaillage' },
      { xp: 1000, text: 'Four à bois' },
      { xp: 5000, text: 'Exposition en galerie' },
    ],
  },
  {
    id: 'tim', name: 'Tim', verb: 'imprimer un objet', unit: 'objet',
    reward: { gold: 15, xp: 8 }, cost: 10000, unlockXp: 15000,
    milestones: [
      { xp: 250, text: 'Première figurine' },
      { xp: 1000, text: 'Imprimante multicolore' },
      { xp: 5000, text: 'Ferme d’impression' },
    ],
  },
  {
    // Two cats, one character.
    id: 'cats', name: 'Cookie & Zagreus', verb: 'ronronner', unit: 'ronron',
    reward: { gold: 40, xp: 20 }, cost: 40000, unlockXp: 60000,
    milestones: [
      { xp: 250, text: 'Sieste au soleil' },
      { xp: 1000, text: 'Arbre à chat géant' },
      { xp: 5000, text: 'Distribution de croquettes' },
    ],
  },
  {
    id: 'merlin', name: 'Merlin', verb: 'taper dans le ballon', unit: 'tir',
    reward: { gold: 150, xp: 75 }, cost: 150000, unlockXp: 250000,
    milestones: [
      { xp: 250, text: 'Premier but' },
      { xp: 1000, text: 'Maillot de l’équipe' },
      { xp: 5000, text: 'Capitaine' },
    ],
  },
  {
    id: 'elsa', name: 'Elsa', verb: 'préparer un macaron', unit: 'macaron',
    reward: { gold: 250, xp: 120 }, cost: 600000, unlockXp: 500000,
    milestones: [
      { xp: 250, text: 'Première fournée' },
      { xp: 1000, text: 'Coques parfaites' },
      { xp: 5000, text: 'Macarons en vitrine' },
    ],
  },
  {
    id: 'isa', name: 'Isa', verb: 'corriger une copie', unit: 'copie',
    reward: { gold: 1000, xp: 500 }, cost: 1000000, unlockXp: 1000000,
    milestones: [
      { xp: 250, text: 'Première dictée corrigée' },
      { xp: 1000, text: 'Bulletins trimestriels' },
      { xp: 5000, text: 'Maîtresse de l’année' },
    ],
  },
  {
    id: 'maelie', name: 'Maelie', verb: 'faire une figure', unit: 'figure',
    reward: { gold: 1200, xp: 600 }, cost: 1800000, unlockXp: 2000000,
    milestones: [
      { xp: 250, text: 'Roue parfaite' },
      { xp: 1000, text: 'Équilibre sur la poutre' },
      { xp: 5000, text: 'Médaille d’or' },
    ],
  },
  {
    id: 'julien', name: 'Julien', verb: 'partir à l’aventure', unit: 'aventure',
    reward: { gold: 2500, xp: 1200 }, cost: 3000000, unlockXp: 3500000,
    milestones: [
      { xp: 250, text: 'Marathon de séries' },
      { xp: 1000, text: 'Collection de figurines' },
      { xp: 5000, text: 'Convention de science-fiction' },
    ],
  },
  {
    id: 'marie', name: 'Marie', verb: 'lire une page', unit: 'page',
    reward: { gold: 5000, xp: 2500 }, cost: 5000000, unlockXp: 6000000,
    milestones: [
      { xp: 250, text: 'Carte de bibliothèque' },
      { xp: 1000, text: 'Lecture rapide' },
      { xp: 5000, text: 'Écrit son propre livre' },
    ],
  },
  {
    id: 'isis', name: 'Isis', verb: 'scroller une vidéo', unit: 'vidéo',
    reward: { gold: 9000, xp: 4500 }, cost: 8000000, unlockXp: 10000000,
    milestones: [
      { xp: 250, text: 'Premier like' },
      { xp: 1000, text: 'Story virale' },
      { xp: 5000, text: 'Brainrot en boucle' },
    ],
  },
  {
    // The grandfather: psychologist and DIY renovation fan.
    id: 'yvan', name: 'Yvan', verb: 'rénover', unit: 'rénovation',
    reward: { gold: 16000, xp: 8000 }, cost: 13000000, unlockXp: 16000000,
    milestones: [
      { xp: 250, text: 'Premier patient' },
      { xp: 1000, text: 'Salle de bain refaite' },
      { xp: 5000, text: 'Maison rénovée de fond en comble' },
    ],
  },
  {
    id: 'marc', name: 'Marc Anthony', verb: 'nager une longueur', unit: 'longueur',
    reward: { gold: 1000000, xp: 1000000 }, cost: 20000000, unlockXp: 25000000, // absurdly strong on purpose
    milestones: [
      { xp: 250, text: 'Premier plongeon' },
      { xp: 1000, text: 'Mille longueurs' },
      { xp: 5000, text: 'Champion de natation' },
    ],
  },
];

export const MAX_LEVEL = 10; // for characters, shop objects and quests

// Shop (gold): one object per character, bought in levels. Each level adds `gold` per click.
export const ITEMS = [
  { id: 'pick', char: 'sacha', name: 'Médiator porte-bonheur', icon: 'pick', gold: 1, cost: 25,  text: 'Chaque niveau : +1 or à chaque clic sur Sacha.' },
  { id: 'keyboard', char: 'anthea', name: 'Clavier gamer',      icon: 'keyboard', gold: 3, cost: 150, text: 'Chaque niveau : +3 or à chaque clic sur Anthea.' },
  { id: 'clay', char: 'alix',   name: 'Argile fine',            icon: 'clay', gold: 8, cost: 800, text: 'Chaque niveau : +8 or à chaque clic sur Alix.' },
  { id: 'spool', char: 'tim',  name: 'Filament premium',       icon: 'spool', gold: 20, cost: 4000, text: 'Chaque niveau : +20 or à chaque clic sur Tim.' },
  { id: 'catnip', char: 'cats', name: 'Herbe à chat',          icon: 'catnip', gold: 50, cost: 15000, text: 'Chaque niveau : +50 or à chaque clic sur Cookie & Zagreus.' },
  { id: 'boots',  char: 'merlin', name: 'Crampons neufs',        icon: 'boot',   gold: 120, cost: 60000, text: 'Chaque niveau : +120 or à chaque clic sur Merlin.' },
  { id: 'piping', char: 'elsa',   name: 'Poche à douille',       icon: 'piping', gold: 300, cost: 250000, text: 'Chaque niveau : +300 or à chaque clic sur Elsa.' },
  { id: 'redpen', char: 'isa',    name: 'Stylo rouge',           icon: 'pen',    gold: 700, cost: 600000, text: 'Chaque niveau : +700 or à chaque clic sur Isa.' },
  { id: 'ribbon', char: 'maelie', name: 'Ruban de gymnastique',  icon: 'ribbon', gold: 1400, cost: 1200000, text: 'Chaque niveau : +1 400 or à chaque clic sur Maelie.' },
  { id: 'ticket', char: 'julien', name: 'Place de cinéma',       icon: 'ticket', gold: 3000, cost: 2000000, text: 'Chaque niveau : +3 000 or à chaque clic sur Julien.' },
  { id: 'readlamp', char: 'marie', name: 'Lampe de lecture',      icon: 'lamp',   gold: 6000, cost: 4000000, text: 'Chaque niveau : +6 000 or à chaque clic sur Marie.' },
  { id: 'battery', char: 'isis',  name: 'Batterie externe',      icon: 'battery', gold: 11000, cost: 6500000, text: 'Chaque niveau : +11 000 or à chaque clic sur Isis.' },
  { id: 'drill',   char: 'yvan',  name: 'Perceuse sans fil',     icon: 'drill',   gold: 20000, cost: 10000000, text: 'Chaque niveau : +20 000 or à chaque clic sur Yvan.' },
  { id: 'goggles', char: 'marc',  name: 'Lunettes de natation',  icon: 'goggles', gold: 35000, cost: 16000000, text: 'Chaque niveau : +35 000 or à chaque clic sur Marc Anthony.' },
];

// Quests (xp): one per character, bought in levels. Each quest level is +1 character level,
// and the character acts on their own at `rate` × quest level actions/s.
// Rates grow for later characters so the late game runs mostly on its own.
export const QUESTS = [
  { id: 'concert', char: 'sacha', name: 'Concert de rue',  icon: 'note', rate: 0.5,  cost: 20, text: 'Sacha joue tout seul' },
  { id: 'raid',    char: 'anthea', name: 'Raid du soir',    icon: 'monitor', rate: 0.25, cost: 60, text: 'Anthea joue toute seule' },
  { id: 'market',  char: 'alix',   name: 'Marché artisanal', icon: 'vase', rate: 0.2, cost: 300, text: 'Alix façonne en autonomie' },
  { id: 'orders',  char: 'tim',    name: 'Commandes en ligne', icon: 'cube', rate: 0.4, cost: 1500, text: 'Tim imprime en autonomie' },
  { id: 'mice',    char: 'cats',   name: 'Chasse aux souris', icon: 'mouse', rate: 0.6, cost: 6000, text: 'Cookie & Zagreus chassent et ronronnent en autonomie' },
  { id: 'match',   char: 'merlin', name: 'Match du mercredi', icon: 'ball',  rate: 0.8, cost: 25000, text: 'Merlin joue au foot en autonomie' },
  { id: 'tearoom', char: 'elsa',   name: 'Comptoir à macarons', icon: 'macaron', rate: 1, cost: 100000, text: 'Elsa prépare des macarons en autonomie' },
  { id: 'council', char: 'isa',    name: 'Conseil de classe', icon: 'paper', rate: 1.2, cost: 250000, text: 'Isa corrige des copies en autonomie' },
  { id: 'regional', char: 'maelie', name: 'Compétition régionale', icon: 'medal', rate: 1.5, cost: 500000, text: 'Maelie s’entraîne en autonomie' },
  { id: 'scifi',   char: 'julien', name: 'Soirée cinéma SF', icon: 'rocket', rate: 1.8, cost: 900000, text: 'Julien part à l’aventure en autonomie' },
  { id: 'bookclub', char: 'marie', name: 'Club de lecture', icon: 'book', rate: 2.1, cost: 1800000, text: 'Marie lit toute seule' },
  { id: 'scroll',  char: 'isis',   name: 'Scroll infini',   icon: 'heart', rate: 2.5, cost: 3000000, text: 'Isis scrolle toute seule sur les réseaux sociaux' },
  { id: 'cabinet', char: 'yvan',   name: 'Cabinet de psychologie', icon: 'couch', rate: 3, cost: 5000000, text: 'Yvan reçoit ses patients et bricole en autonomie' },
  { id: 'pool',    char: 'marc',   name: 'Entraînement à la piscine', icon: 'wave', rate: 3.5, cost: 8000000, text: 'Marc Anthony nage en autonomie' },
];

const QUEST_GROWTH = 1.6;
const ITEM_GROWTH = 1.5;

export function newState() {
  return { gold: 0, xp: 0, totalGold: 0, totalXp: 0, hired: { sacha: true }, charXp: {}, actions: {}, items: {}, quests: {} };
}

// Trust boundary: localStorage can hold anything, so keep only valid numbers.
export function load(json) {
  const s = newState();
  try {
    const raw = JSON.parse(json);
    for (const k of ['gold', 'xp', 'totalGold', 'totalXp']) {
      if (Number.isFinite(raw?.[k]) && raw[k] >= 0) s[k] = raw[k];
    }
    for (const c of CHARACTERS) {
      if (raw?.hired?.[c.id] === true || raw?.levels?.[c.id] > 0) s.hired[c.id] = true; // `levels`: saves before quests did levelling
      const cx = raw?.charXp?.[c.id];
      if (Number.isFinite(cx) && cx >= 0) s.charXp[c.id] = cx;
      const n = raw?.actions?.[c.id];
      if (Number.isFinite(n) && n >= 0) s.actions[c.id] = n;
    }
    for (const it of ITEMS) if (Number.isInteger(raw?.items?.[it.id]) && raw.items[it.id] > 0) s.items[it.id] = Math.min(raw.items[it.id], MAX_LEVEL);
    for (const q of QUESTS) if (Number.isInteger(raw?.quests?.[q.id]) && raw.quests[q.id] > 0) s.quests[q.id] = Math.min(raw.quests[q.id], MAX_LEVEL);
  } catch { /* corrupt save: start fresh */ }
  return s;
}

const mine = (list, c) => list.filter((x) => x.char === c.id);
// Hired = level 1, +1 per quest level, capped: the 10th quest level only adds speed.
export const level = (s, c) => (s.hired[c.id] ? Math.min(1 + mine(QUESTS, c).reduce((n, q) => n + questLevel(s, q), 0), MAX_LEVEL) : 0);
export const charXp = (s, c) => s.charXp[c.id] ?? 0;
export const isUnlocked = (s, c) => s.totalXp >= c.unlockXp;
export const reached = (s, c) => c.milestones.filter((m) => charXp(s, c) >= m.xp);
export const nextMilestone = (s, c) => c.milestones.find((m) => charXp(s, c) < m.xp);

export function stats(s, c) {
  const lv = level(s, c);
  if (!lv) return { gold: 0, xp: 0, auto: 0, clickGold: 0 };
  const mult = lv;
  const auto = mine(QUESTS, c).reduce((sum, q) => sum + q.rate * questLevel(s, q), 0);
  const bonus = mine(ITEMS, c).reduce((sum, it) => sum + it.gold * itemLevel(s, it), 0);
  const gold = c.reward.gold * mult;
  return { gold, xp: c.reward.xp * mult, auto, clickGold: gold + bonus };
}

// n can be fractional (passive income over a tick).
export function act(s, c, n = 1) {
  const { gold, xp } = stats(s, c);
  s.gold += gold * n; s.totalGold += gold * n;
  s.xp += xp * n; s.totalXp += xp * n;
  s.charXp[c.id] = charXp(s, c) + xp * n;
  if (level(s, c)) s.actions[c.id] = (s.actions[c.id] ?? 0) + n;
}

// A click is one action plus the shop items' per-click gold.
export function click(s, c) {
  if (!level(s, c)) return;
  act(s, c);
  const { gold, clickGold } = stats(s, c);
  s.gold += clickGold - gold; s.totalGold += clickGold - gold;
}

export function tick(s, dtSeconds) {
  for (const c of CHARACTERS) act(s, c, stats(s, c).auto * dtSeconds);
}

export function rates(s) {
  const out = { gold: 0, xp: 0 };
  for (const c of CHARACTERS) {
    const st = stats(s, c);
    out.gold += st.gold * st.auto; out.xp += st.xp * st.auto;
  }
  return out;
}

export function hire(s, c) {
  if (s.hired[c.id] || !isUnlocked(s, c) || s.gold < c.cost) return false;
  s.gold -= c.cost;
  s.hired[c.id] = true;
  return true;
}

const owner = (x) => CHARACTERS.find((c) => c.id === x.char);

export const itemLevel = (s, it) => s.items[it.id] ?? 0;
export const itemPrice = (s, it) => Math.ceil(it.cost * ITEM_GROWTH ** itemLevel(s, it));

export function buyItem(s, it) {
  const p = itemPrice(s, it);
  if (!isUnlocked(s, owner(it)) || itemLevel(s, it) >= MAX_LEVEL || s.gold < p) return false;
  s.gold -= p;
  s.items[it.id] = itemLevel(s, it) + 1;
  return true;
}

export const questLevel = (s, q) => s.quests[q.id] ?? 0;
export const questPrice = (s, q) => Math.ceil(q.cost * QUEST_GROWTH ** questLevel(s, q));

export function buyQuest(s, q) {
  const p = questPrice(s, q);
  if (!s.hired[q.char] || questLevel(s, q) >= MAX_LEVEL || s.xp < p) return false;
  s.xp -= p;
  s.quests[q.id] = questLevel(s, q) + 1;
  return true;
}
