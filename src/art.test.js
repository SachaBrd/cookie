import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SPRITES, PALETTE, ICONS } from './art.js';
import { ITEMS, QUESTS } from './logic.js';
import { CHARACTERS } from './logic.js';

test('every character has 16x24 idle/act frames using only palette colors', () => {
  for (const c of CHARACTERS) {
    for (const f of ['idle', 'act']) {
      const rows = SPRITES[c.id]?.[f];
      assert.equal(rows?.length, 24, `${c.id}.${f}`);
      for (const row of rows) {
        assert.equal(row.length, 16, `${c.id}.${f}: "${row}"`);
        for (const px of row) assert.ok(px === '.' || px in PALETTE, `${c.id}.${f}: unknown pixel ${px}`);
      }
    }
  }
});

test('drawPlain only paints inside the canvas', async () => {
  const { drawPlain } = await import('./art.js');
  const [w, h] = [120, 80];
  let calls = 0;
  const ctx = { fillRect(x, y, pw, ph) {
    calls++;
    assert.ok(x >= -1 && y >= -1 && x < w + 1 && y < h + 1 && pw > 0 && ph > 0, `${x},${y},${pw},${ph}`);
  } };
  const { clouds } = drawPlain(ctx, w, h);
  assert.ok(calls > 100);
  assert.ok(clouds.length > 0 && clouds.every((c) => c.x >= 0 && c.x < w && c.y >= 0));
});

test('icons are 8x8, use the palette, and every item/quest icon exists', () => {
  for (const [name, rows] of Object.entries(ICONS)) {
    assert.equal(rows.length, 8, name);
    for (const row of rows) {
      assert.equal(row.length, 8, `${name}: "${row}"`);
      for (const px of row) assert.ok(px === '.' || px in PALETTE, `${name}: unknown pixel ${px}`);
    }
  }
  for (const x of [...ITEMS, ...QUESTS]) assert.ok(x.icon in ICONS, x.icon);
});
