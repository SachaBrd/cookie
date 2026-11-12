# Les plus forts

An incremental game: click your characters to earn gold and xp, train them, and reach milestones that make them work on their own.

The game's interface is in French; code and comments are in English.

Plain HTML/CSS/JS modules, no build step.

- Play locally: `npm start` (or any static server; opening `index.html` via `file://` won't load ES modules)
- Test: `npm test`
- Dev cheat: on localhost (or with `?debug` in the URL), click the leftmost cloud for +100k gold and xp.
- Deploy: upload the folder to any static host (GitHub Pages, Netlify, S3…)

## Layout
- `src/logic.js` — game rules: characters (`CHARACTERS`), one shop object per character (`ITEMS`, levelled with gold) and one repeatable quest per character (`QUESTS`, rewards xp).
- `src/art.js` — pixel-art sprites (edit the text rows) and palette.
- `src/sound.js` — synthesized guitar note and page-turn sounds.
- `src/main.js` — DOM rendering, game loop, localStorage save.
- `src/logic.test.js` — rule tests.

Characters, in unlock order: Sacha (guitar, click him), Anthea (online games on her PC), Alix (pottery), Tim (3D printing), Cookie & Zagreus (two cats, one character), Merlin (football), Elsa (macarons only), Isa (schoolteacher, marks copies), Maelie (teenage gymnast), Julien (sci-fi fan: wizard hat, star shield, war hammer), Marie (reads books), Isis (teenager, always on her phone), Yvan (the grandfather: psychologist and DIY renovator), Marc Anthony (very muscular swimmer). Each is unlocked by lifetime xp and hired with gold, and maxes out at level 10. Shop objects (gold) add gold per click; quests (xp) level characters up and make them act on their own. Milestones are cosmetic.
