// Pixel-art sprites: 16 px wide x 24 tall (optional `scale` to show one bigger), one char per pixel, '.' = transparent.
// Each character has an `idle` frame and an `act` frame (shown briefly on each action).

export const PALETTE = {
  H: '#3b2416', // Sacha's hair
  A: '#9c4a1a', // Anthea's hair
  S: '#f1c27d', // skin
  E: '#222222', // eyes
  M: '#a0522d', // mouth
  T: '#1f1f2e', // t-shirt
  J: '#2c3e7a', // jeans
  B: '#111111', // shoes
  G: '#d62828', // guitar body
  W: '#f2f2f2', // pickguard
  N: '#8b5a2b', // guitar neck
  K: '#444444', // headstock
  D: '#6a4c93', // dress
  C: '#2e7d32', // book cover
  P: '#fdf6e3', // pages
  L: '#9a9a9a', // printed lines
  Y: '#f4c542', // gold
  O: '#a8741a', // gold shade
  V: '#e8d29a', // parchment
  R: '#c1663a', // clay
  U: '#3d6b8c', // apron
  Z: '#e8c35a', // Alix's hair
  F: '#e07b39', // Tim's hoodie, Zagreus' fur
  Q: '#8e8e93', // Cookie's fur
  X: '#5c5c63', // Cookie's dark fur
  I: '#b85a1f', // Zagreus' stripes
  // Lowercase once the alphabet ran out.
  p: '#f2a7c3', // pink (macaron, Elsa's shirt)
  m: '#9be3c3', // mint macaron
  v: '#c9a7f2', // lavender macaron
  o: '#c8461b', // Isa's red hair
  e: '#2f80ed', // Sacha's blue eyes
  b: '#6b4226', // Marc Anthony's skin
  d: '#4a2c17', // Marc Anthony's muscle shading
};

const SACHA_TOP = [
  '......HHHH......', // round bun on top
  '.....HHHHHH.....',
  '......HHHH......',
  '...HHHHHHHHHH...',
  '...HHSSSSSSHH...',
  '...HSeSSSSeSH...', // blue eyes
  '...HSSSSSSSSH...',
  '...HSSSMMSSSH...',
  '...HHSSSSSSHH...',
  '...HHH.SS.HHH...', // long hair down to the chest
  '...HHTTTTTTHH...',
  '...HTTTTTTTTH...',
  'KK.HTTTTTTTTH...',
  '.NNSTTTTTTTTTT..',
];
const SACHA_BOTTOM = [
  '....TTTGGWWWGGG.',
  '....JJJJGGGGGG..',
  '....JJJ..GGGG...',
  '....JJJ..JJJ....',
  '...BBBB..BBBB...',
  '...BBBB..BBBB...',
];

// Children (Anthea, Alix, Merlin) are 16 px tall: 8 empty rows on top, feet on the ground.
const CHILD_SPACE = Array(8).fill('................');

const ANTHEA_TOP = [
  ...CHILD_SPACE,
  '.....AAAAAA.....',
  '....AAAAAAAA....',
  '...AASSSSSSAA...',
  '...ASESSSSESA...',
  '...ASSSMMSSSA...',
  '...AASSSSSSAA...',
];
// Anthea at her computer: screen, stand and desk in front of her.
const ANTHEA_BOTTOM = [
  '......KKKK......',
  '.NNNNNNNNNNNNNN.',
  '.N....SS.SS...N.',
  '.N...BBB.BBB..N.',
];

// Marie (adult) reads a book.
const MARIE_TOP = [
  '.....NNNNNN.....',
  '....NNNNNNNN....',
  '...NNNNNNNNNN...',
  '...NNSSSSSSNN...',
  '...NSSSSSSSSN...',
  '...NSESSSSESN...',
  '...NSSSSSSSSN...',
  '...NSSSMMSSSN...',
  '...NNSSSSSSNN...',
  '...NNN.SS.NNN...',
  '...NNUUUUUUNN...',
];
const MARIE_BOTTOM = [
  '...UCCCCCCCCU...',
  '....UUUUUUUU....',
  '...UUUUUUUUUU...',
  '..UUUUUUUUUUUU..',
  '.....SS..SS.....',
  '.....SS..SS.....',
  '....BBB..BBB....',
  '....BBB..BBB....',
];

const ALIX_TOP = [
  ...CHILD_SPACE,
  '.....ZZZZZZ.....',
  '....ZZZZZZZZ....',
  '....ZSSSSSSZ....',
  '....SESSSSES....',
  '....SSSMMSSS....',
  '.....SSSSSS.....',
  '....UUUUUUUU....', // apron
  '...SUUUUUUUUS...',
  '....SSRRRRSS....', // hands on the clay
];
const ALIX_BOTTOM = [
  '...KKKKKKKKKK...',
  '....JJ.KK.JJ....',
  '...BBB.KK.BBB...',
  '...BBBKKKKBBB...',
];

const TIM_TOP = [
  '.....EEEEEE.....',
  '....EEEEEEEE....',
  '...EEEEEEEEEE...',
  '...ESSSSSSSSE...',
  '...SSSSSSSSSS...',
  '...SKEKSSKEKS...', // glasses
  '....SSSSSSSS....',
  '....SSSMMSSS....',
  '.....SSSSSS.....',
  '......SSSS......',
  '...FFFFFFFFFF...',
  '..FFFFFFFFFFFF..',
  '..SFFFFFFFFFFS..',
  '.KKKKKKKKKKKKKK.', // printer frame
];
const TIM_BOTTOM = [
  '.KTTTCCCCCTTTTK.',
  '.KLLLLLLLLLLLLK.', // print bed
  '.KKKKKKKKKKKKKK.',
  '....JJ....JJ....',
  '....JJ....JJ....',
  '...BBB....BBB...',
  '...BBB....BBB...',
];

// Cookie (grey, tail on the left) and Zagreus (orange, mirrored, striped) share one 16px sprite.
const COOKIE = [
  '.Q.....Q',
  '.QQ...QQ',
  '.QQQQQQQ',
  '.QCQQQCQ', // green eyes
  '.QQQMQQQ',
  '..QQQQQ.',
  '...QQQ..',
  '..QQQQQ.',
  'Q.QQQQQ.',
  'QQQQQQQQ',
  'QQWQQQWQ', // white paws
];
const mirror = (rows) => rows.map((r) => [...r].reverse().join(''));
const ZAGREUS = mirror(COOKIE).map((r) => r.replace(/Q/g, 'F'));
ZAGREUS[2] = 'FFIFIFF.';
ZAGREUS[7] = '.FIFIF..';
// Purring: eyes closed, tail raised.
const purr = (rows, body, dark, tailCol) => rows.map((r, y) => {
  const px = [...r.replace(/C/g, dark)];
  if (y >= 5 && y <= 8) px[tailCol] = body;
  return px.join('');
});
const catsFrame = (left, right) => [...Array(13).fill('.'.repeat(16)), ...left.map((r, i) => r + right[i])];

// Merlin: child size, ball at the feet.
const ELSA_TOP = [
  '.....WWWWWW.....', // chef's hat
  '....WWWWWWWW....',
  '....WWWWWWWW....',
  '.....WWWWWW.....',
  '...OOSSSSSSOO...',
  '...OSESSSSESO...',
  '...OSSSSSSSSO...',
  '...OSSSMMSSSO...',
  '...OOSSSSSSOO...',
  '...OO.SSSS.OO...',
  '...ppWWWWWWpp...', // pink shirt, white apron
  '..ppWWWWWWWWpp..',
];
const ELSA_BOTTOM = [
  '.LLLLLLLLLLLLLL.', // tray
  '....WWWWWWWW....',
  '....WWWWWWWW....',
  '....WWWWWWWW....',
  '....TTTTTTTT....',
  '....TTT..TTT....',
  '....TTT..TTT....',
  '....TTT..TTT....',
  '...BBBB..BBBB...',
  '...BBBB..BBBB...',
];

// Maelie is a teenager: 20 px tall, between children (16) and adults (24).
// Idle: arms up in a V. Act: the same drawing upside down = a handstand.
const MAELIE = [
  '..S..........S..',
  '..S...NNNN...S..',
  '...S.NNNNNN.S...',
  '...S.NSSSSN.S...',
  '....SNESSENS....',
  '....SNSMMSNS....',
  '.....S.SS.S.....',
  '.....vvvvvv.....', // lavender leotard
  '.....vvvvvv.....',
  '.....vvWvvv.....',
  '......vvvv......',
  '......vvvv......',
  '.....SS..SS.....',
  '.....SS..SS.....',
  '.....SS..SS.....',
  '.....SS..SS.....',
  '.....SS..SS.....',
  '.....SS..SS.....',
  '.....SS..SS.....',
  '....SSS..SSS....',
];
const TEEN_SPACE = Array(4).fill('................');

// Julien: grey pointed wizard hat, round red/white/blue shield with a star, war hammer in the other hand.
const JULIEN = [
  '.......LL.......',
  '......LLL.......',
  '......LLLL......',
  '.....LLLLLL.....',
  '..LLLLLLLLLLLL..', // hat brim
  '...HHSSSSSSHH...',
  '...HSESSSSESH...',
  '...HSSSSSSSSH...',
  '....SSSMMSSS....',
  '.....SSSSSS.....',
  '......SSSS......',
  '...TTTTTTTTTT...',
  '..TTTTTTTTTTTT..',
  '..TTTTTTTTTTTT..',
  '..STTTTTTTTTTS..',
  '...TTTTTTTTTT...',
  '...TTTTTTTTTT...',
  '....JJJJJJJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '...BBBB..BBBB...',
  '...BBBB..BBBB...',
];
const SHIELD = [
  '..GGG..',
  '.GWWWG.',
  'GWUUUWG',
  'GWUWUWG', // white star in the middle
  'GWUUUWG',
  '.GWWWG.',
  '..GGG..',
];
const HAMMER = [
  'LLLL',
  'LLLL',
  '.N..',
  '.N..',
  '.N..',
];
// Paint `art` over `rows` with its top-left corner at (x, y); '.' stays see-through.
const overlay = (rows, art, x, y) => rows.map((r, i) => {
  const line = art[i - y];
  if (!line) return r;
  return [...r].map((c, j) => (line[j - x] && line[j - x] !== '.' ? line[j - x] : c)).join('');
});

// Isis (teenager, 20 px): eyes on the phone held in front of her.
const ISIS_HEAD = [
  '.....EEEEEE.....',
  '....EEEEEEEE....',
  '...EESSSSSSEE...',
  '...ESSSSSSSSE...',
  '...ESESSSSESE...',
  '...ESSSMMSSSE...',
  '...EESSSSSSEE...',
  '...EEmmmmmmEE...', // mint top, long black hair
];
const ISIS_BOTTOM = [
  '....mmKKKKmm....', // phone bottom edge
  '....mmmmmmmm....',
  '....JJJJJJJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '...pppp..pppp...', // pink sneakers
  '...pppp..pppp...',
];

const ISA_TOP = [
  '................',
  '.....oooooo.....', // red bob with a fringe
  '....oooooooo....',
  '...oooooooooo...',
  '...oooooooooo...',
  '...oSESSSSESo...',
  '...oSSSSSSSSo...',
  '...oSSSMMSSSo...',
  '...ooSSSSSSoo...',
  '......SSSS......',
  '...CCCCCCCCCC...', // green cardigan, white blouse
  '..CCCCWWWWCCCC..',
  '..CCCCWWWWCCCC..',
];
const ISA_BOTTOM = [
  '.NNNNNNNNNNNNNN.', // desk
  '.N..DDDDDDDD..N.',
  '.N..DDDDDDDD..N.',
  '.N...SS..SS...N.',
  '.N...SS..SS...N.',
  '.N...SS..SS...N.',
  '.N...SS..SS...N.',
  '.N..BBB..BBB..N.',
  '.NN.BBB..BBB.NN.',
];

const MERLIN_TOP = [
  ...CHILD_SPACE,
  '.....HHHHHH.....',
  '....HHHHHHHH....',
  '....HSSSSSSH....',
  '....SESSSSES....',
  '....SSSMMSSS....',
  '.....SSSSSS.....',
  '....GGGGGGGG....', // red jersey
  '...SGGWWGGGGS...',
  '...SGGWGGGGGS...',
  '....GGGGGGGG....',
  '....WWWWWWWW....', // white shorts
];

// Yvan, the grandfather: full white hair and full beard, glasses, flannel shirt, cordless drill.
const YVAN = [
  '................',
  '.....WWWWWW.....',
  '....WWWWWWWW....',
  '...WWWWWWWWWW...',
  '...WWSSSSSSWW...',
  '...WKEKSSKEKW...',
  '...WSSSSSSSSW...',
  '...WWSSSSSSWW...', // beard
  '...WWWWMMWWWW...',
  '....WWWWWWWW....',
  '.....WWWWWW.....',
  '...GGGGGGGGGG...',
  '..GGEGGEGGEGGG..',
  '..GGGGGGGGGGGG..',
  '..SGEGGEGGEGGS..',
  '...GGGGGGGGGG...',
  '...GEGGEGGEGG...',
  '....JJJJJJJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '....JJJ..JJJ....',
  '...BBBB..BBBB...',
  '...BBBB..BBBB...',
];

// Marc Anthony: massive swimmer, drawn at the usual 16x24 but shown at 2x scale (see `scale` below).
const MARC_LEGS = [
  '....UUUUUUUU....', // swim trunks
  '....UUU..UUU....',
  '...bbbb..bbbb...',
  '...bdbb..bbdb...',
  '....bbb..bbb....',
  '....bbb..bbb....',
  '....bbb..bbb....',
  '...bbbb..bbbb...',
];
const MARC_FLEX = [ // double biceps
  '................',
  '.....EEEEEE.....',
  '....EEEEEEEE....',
  '....KUUKKUUK....',
  '....bbbbbbbb....',
  'bb..bEbbbbEb..bb',
  'bb..bbbbbbbb..bb',
  'bb..bbbWWbbb..bb',
  'bbb.dbbbbbbd.bbb',
  'bbbbbbbbbbbbbbbb',
  '.bbbbbbbbbbbbbb.',
  '..bbbdbbbbdbbb..',
  '...bbbddddbbb...',
  '....bbdbbdbb....',
  '....bbdbbdbb....',
  '....bbbbbbbb....',
  ...MARC_LEGS,
];
const MARC_STROKE = [ // crawl stroke with splashes
  '..W.........U...',
  '.bb..EEEEEE.....',
  '.bb.EEEEEEEE....',
  '.bb.KUUKKUUK....',
  '.bb.bbbbbbbb....',
  '.bb.bEbbbbEb..U.',
  '.bb.bbbbbbbb....',
  '.bb.bbbWWbbb....',
  '.bbb.dbbbbd.....',
  '.bbbbbbbbbbbbbb.',
  '.bbbbbbbbbbbbbb.',
  '..bbbdbbbbdbbbbb',
  '...bbbddddbbb.bb',
  '....bbdbbdbb..bb',
  '....bbdbbdbb..bb',
  '....bbbbbbbb..bb',
  ...MARC_LEGS,
];

export const SPRITES = {
  sacha: {
    idle: [...SACHA_TOP, // picking hand above the strings
      '..SNNTTTTTTTTS..',
      '....TNNTTGGGGS..',
      '....TTTNGGGGGGS.',
      '....TTTGGWWGGG..',
      ...SACHA_BOTTOM],
    act: [...SACHA_TOP, // picking hand across the strings
      '..SNNTTTTTTTTT..',
      '....TNNTTGGGGS..',
      '....TTTNGGGGGS..',
      '....TTTGGWWGSS..',
      ...SACHA_BOTTOM],
  },
  anthea: {
    idle: [...ANTHEA_TOP, // playing an online game
      '...AADDDDDDAA...',
      '..KKKKKKKKKKKK..',
      '..KUUUUUUUUUUK..',
      '..KUUGUUUUCUUK..',
      '..KCCCCCCCCCCK..',
      '..KKKKKKKKKKKK..',
      ...ANTHEA_BOTTOM],
    act: [...ANTHEA_TOP, // a spell flashes on screen
      '...AADDDDDDAA...',
      '..KKKKKKKKKKKK..',
      '..KUUUUWUUUUUK..',
      '..KUUGYYYYCUUK..',
      '..KCCCCCCCCCCK..',
      '..KKKKKKKKKKKK..',
      ...ANTHEA_BOTTOM],
  },
  marc: { idle: MARC_FLEX, act: MARC_STROKE, scale: 2 }, // twice as big as everyone, on purpose
  yvan: {
    idle: overlay(YVAN, ['YYYL', '.YY.'], 12, 12),           // drill in hand
    act: overlay(YVAN, ['...V', 'YYYW', '.YY.'], 12, 11),    // bit spinning, sawdust
  },
  isis: {
    idle: [...TEEN_SPACE, ...ISIS_HEAD,
      '...EmmKUUKmmE...',
      '...EmSKUUKSmE...',
      ...ISIS_BOTTOM],
    act: [ // new video on screen, a "like" heart pops up
      '................',
      '............G.G.',
      '............GGG.',
      '.............G..',
      ...ISIS_HEAD,
      '...EmmKGYKmmE...',
      '...EmSKYGKSmE...',
      ...ISIS_BOTTOM],
  },
  marie: {
    idle: [...MARIE_TOP, // open book
      '....UUUUUUUU....',
      '...UUUUUUUUUU...',
      '...UCPPPPPPCU...',
      '...SCPLPPLPCS...',
      '...SCPLPPLPCS...',
      ...MARIE_BOTTOM],
    act: [...MARIE_TOP, // page flipping over
      '....UUUUUPUU....',
      '...UUUUUUPUUU...',
      '...UCPPPPPPCU...',
      '...SCPLPPPPCS...',
      '...SCPLPPPPCS...',
      ...MARIE_BOTTOM],
  },
  alix: {
    idle: [...ALIX_TOP, // pot on the wheel
      '.....RRRRRR.....',
      '.....RRRRRR.....',
      '..LLLLLLLLLLLL..',
      ...ALIX_BOTTOM],
    act: [...ALIX_TOP, // pot being shaped, wheel spinning
      '......RRRR......',
      '.....RRRRRR.....',
      '..LWLLLLLLWLLL..',
      ...ALIX_BOTTOM],
  },
  tim: {
    idle: [...TIM_TOP, // nozzle above the object
      '.KTTTTYYTTTTTTK.',
      '.KTTTTTYTTTTTTK.',
      '.KTTTTCCCTTTTTK.',
      ...TIM_BOTTOM],
    act: [...TIM_TOP, // nozzle moves, a new layer appears
      '.KTTTTTTTYYTTTK.',
      '.KTTTTTTTTYTTTK.',
      '.KTTTTCCCCTTTTK.',
      ...TIM_BOTTOM],
  },
  cats: {
    idle: catsFrame(COOKIE, ZAGREUS),
    act: catsFrame(purr(COOKIE, 'Q', 'X', 0), purr(ZAGREUS, 'F', 'I', 7)),
  },
  julien: {
    idle: overlay(overlay(JULIEN, HAMMER, 12, 9), SHIELD, 0, 13), // shield at the side, hammer in hand
    act: overlay(overlay(JULIEN, HAMMER, 12, 9), SHIELD, 0, 9),   // shield raised
  },
  maelie: {
    idle: [...TEEN_SPACE, ...MAELIE],
    act: [...TEEN_SPACE, ...MAELIE.slice().reverse()],
  },
  isa: {
    idle: [...ISA_TOP, // red pen ready next to the copy
      '...SPPPPPPPPSG..',
      '.NNNPLLLLLLPNNN.',
      ...ISA_BOTTOM],
    act: [...ISA_TOP, // pen on the copy, red marks appear
      '...SPPPPPPPGS...',
      '.NNNPLLLLGGPNNN.',
      ...ISA_BOTTOM],
  },
  elsa: {
    idle: [...ELSA_TOP, // macarons on the tray
      '..ppWWWWWWWWpp..',
      '..SSpp.mm.vvSS..',
      ...ELSA_BOTTOM],
    act: [...ELSA_TOP, // the mint macaron hops up
      '..ppWWWmmWWWpp..',
      '..SSpp....vvSS..',
      ...ELSA_BOTTOM],
  },
  merlin: {
    idle: [...MERLIN_TOP, // ball at the right foot
      '....WWW..WWW....',
      '....SSS..SSS....',
      '....GGG..GGG.WEW',
      '....GGG..GGG.EWE',
      '...BBBB..BBBBWEW'],
    act: [...MERLIN_TOP, // kick: leg forward, ball in the air
      '....WWW..WWW.WEW',
      '....SSS...SSSEWE',
      '....GGG....GGWEW',
      '....GGG.....BB..',
      '...BBBB.........'],
  },
};

// 8x8 interface icons, same palette.
export const ICONS = {
  coin: [
    '..OOOO..',
    '.OYYYYO.',
    'OYYWYYYO',
    'OYWYYYYO',
    'OYYYYYYO',
    'OYYYYYYO',
    '.OYYYYO.',
    '..OOOO..',
  ],
  star: [
    '...YY...',
    '...YY...',
    'YYYYYYYY',
    '.YYYYYY.',
    '..YYYY..',
    '.YYYYYY.',
    '.YY..YY.',
    'YY....YY',
  ],
  bag: [
    '..OOOO..',
    '.O....O.',
    '.VVVVVV.',
    'VVVVVVVV',
    'VVVOOVVV',
    'VVVOOVVV',
    'VVVVVVVV',
    '.VVVVVV.',
  ],
  scroll: [
    '.VVVVVV.',
    'NVVVVVVN',
    '.VLLLLV.',
    '.VVVVVV.',
    '.VLLLLV.',
    '.VVVVVV.',
    'NVVVVVVN',
    '.VVVVVV.',
  ],
  note: [
    '..WWWWWW',
    '..W....W',
    '..W....W',
    '..W....W',
    'WWW..WWW',
    'WWW..WWW',
    '........',
    '........',
  ],
  floppy: [
    'WWWWWWW.',
    'WLLLLWWW',
    'WLLLLWWW',
    'WWWWWWWW',
    'WLLLLLLW',
    'WLWWWWLW',
    'WLWWWWLW',
    'WWWWWWWW',
  ],
  pick: [
    '.GGGGGG.',
    'GGGGGGGG',
    'GGWGGGGG',
    'GGGGGGGG',
    '.GGGGGG.',
    '..GGGG..',
    '...GG...',
    '........',
  ],
  lamp: [
    '..YYYY..',
    '.YYYYYY.',
    'YYYYYYYY',
    '...NN...',
    '...NN...',
    '...NN...',
    '.NNNNNN.',
    '........',
  ],
  book: [
    'CCCCCCC.',
    'CPPPPPCC',
    'CPLLLPCC',
    'CPPPPPCC',
    'CPLLLPCC',
    'CPPPPPCC',
    'CCCCCCCC',
    '.CCCCCCC',
  ],
};

ICONS.clay = [
  '........',
  '...RR...',
  '..RRRR..',
  '.RRRRRR.',
  'RRRRRRRR',
  'RRRRRRRR',
  '.RRRRRR.',
  '........',
];
ICONS.spool = [
  'LLLLLLLL',
  '.FFFFFF.',
  '.FFLLFF.',
  '.FFLLFF.',
  '.FFFFFF.',
  'LLLLLLLL',
  '........',
  '........',
];
ICONS.cube = [
  '...PP...',
  '.PPPPPP.',
  'CCPPPPUU',
  'CCCCUUUU',
  'CCCCUUUU',
  'CCCCUUUU',
  '.CCCUUU.',
  '...CU...',
];
ICONS.catnip = [
  '....CC..',
  '...CCCC.',
  '.CC.CC..',
  'CCCC.N..',
  '.CC..N..',
  '....N...',
  '...N....',
  '..N.....',
];
ICONS.mouse = [
  '........',
  '.QQ.....',
  'QQQQQ...',
  'QEQQQQ..',
  'MQQQQQQ.',
  '.QQQQQQ.',
  '.......Q',
  '......QQ',
];
ICONS.boot = [
  '........',
  '.GG.....',
  '.GG.....',
  '.GGG....',
  '.GGGGGG.',
  'GGGGGGGG',
  '.W.W.W..',
  '........',
];
ICONS.ball = [
  '..WWWW..',
  '.WWEEWW.',
  'WWEEEEWW',
  'WWWEEWWW',
  'WEWWWWEW',
  'WEEWWEEW',
  '.WEWWEW.',
  '..WWWW..',
];
ICONS.macaron = [
  '........',
  '.pppppp.',
  'pppppppp',
  '.PPPPPP.', // cream filling
  'pppppppp',
  '.pppppp.',
  '........',
  '........',
];
ICONS.piping = [
  'WWWW....',
  'WWWWW...',
  '.WWWWW..',
  '..WWWWW.',
  '...WWWW.',
  '....WWp.',
  '......p.',
  '.......p',
];
ICONS.pen = [
  '.......G',
  '......GG',
  '.....GG.',
  '....GG..',
  '...GG...',
  '..GG....',
  '.GG.....',
  'E.......',
];
ICONS.paper = [
  'PPPPPPP.',
  'PLLLLLP.',
  'PPPPPPP.',
  'PLLLLLP.',
  'PPPPPPP.',
  'PLLGGLP.',
  'PPPPGPP.',
  'PPPPPPP.',
];
ICONS.ribbon = [
  '.pp.....',
  'p..p....',
  'p...p.pp',
  '.p...p..',
  '..p.p...',
  '...p....',
  '..N.....',
  '.N......',
];
ICONS.medal = [
  'G......G',
  '.G....G.',
  '..G..G..',
  '...YY...',
  '..YYYY..',
  '.YYOOYY.',
  '..YYYY..',
  '...YY...',
];
ICONS.goggles = [
  '........',
  '........',
  'LLL..LLL',
  'LUULLUUL',
  'LUULLUUL',
  'LLL..LLL',
  '........',
  '........',
];
ICONS.wave = [
  '........',
  '..UU....',
  '.U..U..U',
  'U....UU.',
  '........',
  '..UU....',
  '.U..U..U',
  'U....UU.',
];
ICONS.drill = [
  '........',
  'YYYYYLLL',
  'YYYYY...',
  '.YY.....',
  '.YY.....',
  '.YYY....',
  '........',
  '........',
];
ICONS.couch = [
  '........',
  '.GGGGGG.',
  '.GGGGGG.',
  'GGGGGGGG',
  'GGGGGGGG',
  'N......N',
  '........',
  '........',
];
ICONS.battery = [
  '........',
  'LLLLLLL.',
  'LCCCCCLL',
  'LCCCCCLL',
  'LCCCCCLL',
  'LLLLLLL.',
  '........',
  '........',
];
ICONS.heart = [
  '.GG..GG.',
  'GGGGGGGG',
  'GGGGGGGG',
  'GGGGGGGG',
  '.GGGGGG.',
  '..GGGG..',
  '...GG...',
  '........',
];
ICONS.ticket = [
  '........',
  'GGGGGGGG',
  'GYYYYYYG',
  '.GYGGYG.',
  '.GYGGYG.',
  'GYYYYYYG',
  'GGGGGGGG',
  '........',
];
ICONS.keyboard = [
  '........',
  'LLLLLLLL',
  'LWLWLWLL',
  'LLLLLLLL',
  'LWLWLWLL',
  'LLWWWWLL',
  'LLLLLLLL',
  '........',
];
ICONS.monitor = [
  'LLLLLLLL',
  'LUUUUUUL',
  'LUGUUCUL',
  'LCCCCCCL',
  'LLLLLLLL',
  '...LL...',
  '..LLLL..',
  '........',
];
ICONS.rocket = [
  '...WW...',
  '..WWWW..',
  '..WUUW..',
  '..WWWW..',
  '.GWWWWG.',
  'GG.WW.GG',
  '...YY...',
  '...OO...',
];
ICONS.vase = [
  '..RRRR..',
  '...RR...',
  '..RRRR..',
  '.RRRRRR.',
  '.RRWRRR.',
  '.RRRRRR.',
  '..RRRR..',
  '..RRRR..',
];

export function draw(ctx, frame) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  frame.forEach((row, y) => [...row].forEach((c, x) => {
    if (c === '.') return;
    ctx.fillStyle = PALETTE[c];
    ctx.fillRect(x, y, 1, 1);
  }));
}

// Procedural pixel-art plain, drawn at low resolution (1 unit = 1 big pixel).
// Seeded so the scenery stays the same between redraws. Returns cloud boxes (canvas units).
export function drawPlain(ctx, w, h) {
  let seed = 42;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const px = (color, x, y, pw = 1, ph = 1) => { ctx.fillStyle = color; ctx.fillRect(Math.floor(x), Math.floor(y), pw, ph); };
  const horizon = Math.floor(h * 0.55);

  const sky = ['#6cbfef', '#83caf2', '#9ad5f4', '#b4e1f6'];
  for (let y = 0; y < horizon; y++) px(sky[Math.floor((y / horizon) * sky.length)], 0, y, w);

  const sun = { x: w * 0.8, y: horizon * 0.25 };
  for (let dy = -5; dy <= 5; dy++) for (let dx = -5; dx <= 5; dx++) {
    if (dx * dx + dy * dy <= 25) px('#fff3b0', sun.x + dx, sun.y + dy);
  }

  const clouds = [];
  for (let i = 0; i < Math.ceil(w / 50); i++) {
    const x = rnd() * w, y = 4 + rnd() * horizon * 0.45;
    px('#ffffff', x, y, 16, 3); px('#ffffff', x + 4, y - 2, 8, 2); px('#e3f2fa', x, y + 3, 16, 1);
    clouds.push({ x: Math.floor(x), y: Math.floor(y) - 2, w: 16, h: 6 });
  }

  // Two layers of rolling hills, far (pale) then near (darker).
  for (const [color, amp, lift, freq, phase] of [['#8cc47a', 0.09, 0.03, 0.035, 1], ['#68ad55', 0.05, 0, 0.06, 4]]) {
    for (let x = 0; x < w; x++) {
      const top = horizon - h * lift - h * amp * (Math.sin(x * freq + phase) * 0.5 + 0.5);
      px(color, x, top, 1, horizon - Math.floor(top));
    }
  }

  px('#5aa83c', 0, horizon, w, h - horizon);
  for (let i = 0; i < (w * (h - horizon)) / 12; i++) {
    const x = rnd() * w, y = horizon + rnd() * (h - horizon);
    px(rnd() < 0.5 ? '#4c9433' : '#6dbb4a', x, y, 1, 2); // grass tufts
  }
  for (let i = 0; i < w / 6; i++) {
    px(['#f4e04d', '#f28cb1', '#ffffff'][Math.floor(rnd() * 3)], rnd() * w, horizon + 2 + rnd() * (h - horizon - 2));
  }
  return { clouds };
}
