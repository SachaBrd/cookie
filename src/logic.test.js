import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHARACTERS, ITEMS, QUESTS, newState, load, stats, act, click, tick, hire, isUnlocked, level, rates, buyItem, itemPrice, buyQuest, questPrice, MAX_LEVEL } from './logic.js';

const [pick, keyboard] = ITEMS;
const [concert] = QUESTS;

const [sacha, anthea] = CHARACTERS;

test('Sacha starts hired; clicking earns gold and xp', () => {
  const s = newState();
  act(s, sacha);
  assert.equal(s.gold, 1);
  assert.equal(s.xp, 1);
  assert.equal(rates(s).gold, 0); // no passive income yet
});

test('no passive income until a quest is bought; quest levels speed it up', () => {
  const s = newState();
  for (let i = 0; i < 50; i++) act(s, sacha);
  assert.equal(stats(s, sacha).auto, 0);
  assert.equal(buyQuest(s, concert), true); // costs 20 xp
  assert.equal(s.xp, 30);
  assert.equal(stats(s, sacha).auto, 0.5);
  tick(s, 2); // 1 note at level 2
  assert.equal(s.gold, 52);
  assert.equal(s.xp, 32);
  assert.equal(questPrice(s, concert), 32);
  assert.equal(buyQuest(s, concert), true);
  assert.equal(buyQuest(s, concert), false); // out of xp
  assert.equal(stats(s, sacha).auto, 1);
  assert.equal(level(s, sacha), 3); // each quest level is a character level
  assert.equal(stats(s, sacha).gold, 3);
});

test('milestones are cosmetic; only the quest level scales rewards', () => {
  const s = newState();
  s.charXp.sacha = 5000;
  s.quests.concert = 1;
  assert.deepEqual(stats(s, sacha), { gold: 2, xp: 2, auto: 0.5, clickGold: 2 });
});

test('Anthea unlocks on lifetime xp and must be hired before she earns', () => {
  const s = newState();
  assert.equal(isUnlocked(s, anthea), false);
  s.totalXp = anthea.unlockXp; s.gold = anthea.cost;
  click(s, anthea);
  assert.equal(s.gold, anthea.cost); // not hired: no reward
  s.xp = 1000;
  assert.equal(buyQuest(s, QUESTS[1]), false); // no quests before hiring
  assert.equal(hire(s, anthea), true);
  assert.equal(hire(s, anthea), false); // only once
  click(s, anthea);
  assert.equal(s.gold, 2);
  assert.equal(s.charXp.anthea, 4);
});

test('characters, objects and quests stop at level 10', () => {
  const s = newState();
  s.xp = 1e9; s.gold = 1e9;
  for (let i = 0; i < 20; i++) { buyQuest(s, concert); buyItem(s, pick); }
  assert.equal(s.quests.concert, MAX_LEVEL);
  assert.equal(s.items.pick, MAX_LEVEL);
  assert.equal(level(s, sacha), MAX_LEVEL);
  assert.equal(stats(s, sacha).auto, 5); // 10th quest level still adds speed
  const l = load(JSON.stringify({ quests: { concert: 50 }, items: { pick: 99 } }));
  assert.equal(l.quests.concert, MAX_LEVEL);
  assert.equal(l.items.pick, MAX_LEVEL);
});

test('load rejects garbage and keeps Sacha hired', () => {
  assert.deepEqual(load('not json'), newState());
  assert.deepEqual(load('{"gold":"999","hired":{"sacha":false,"robin":true}}'), newState());
  const s = load(JSON.stringify({ gold: 5, levels: { anthea: 2 }, charXp: { sacha: 60 } })); // old save format
  assert.deepEqual(s.hired, { sacha: true, anthea: true });
  assert.equal(s.charXp.sacha, 60);
});

test('items add gold per click only, with growing price', () => {
  const s = newState();
  assert.equal(buyItem(s, pick), false); // too poor
  s.gold = 100;
  assert.equal(buyItem(s, pick), true);
  assert.equal(s.gold, 75);
  assert.equal(itemPrice(s, pick), 38);
  click(s, sacha);
  assert.equal(s.gold, 77); // 1 base + 1 from the pick
  assert.equal(s.xp, 1);
  s.quests.concert = 2; // level 3, 1 note/s passive
  tick(s, 1);
  assert.equal(s.gold, 80); // 3 gold per passive note, no click bonus
  s.gold = 1000;
  assert.equal(buyItem(s, keyboard), false); // Anthea not unlocked yet
});

test('load keeps only known items and quests with valid levels', () => {
  const s = load(JSON.stringify({ items: { pick: 3, hax: 2, lamp: true }, quests: { concert: 1, nope: 4 }, actions: { sacha: 12 } }));
  assert.deepEqual(s.items, { pick: 3 });
  assert.deepEqual(s.quests, { concert: 1 });
  assert.equal(s.actions.sacha, 12);
});
