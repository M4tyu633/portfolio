/* Browser presentation only. All emulator state is read from the C++ bridge. */
const canvas = document.getElementById('canvas');
if (new URLSearchParams(location.search).has('embed')) document.body.classList.add('embedded');
const $ = (id) => document.getElementById(id);
const games = [
  { name: 'Brix', hint: '<kbd>A</kbd> <kbd>D</kbd> Move the paddle. Clear the bricks.', spoken: 'Brix. Use A and D to move the paddle.', pad: 'move' },
  { name: 'Pong', hint: 'Player 1: <kbd>1</kbd> <kbd>Q</kbd> &nbsp; Player 2: <kbd>4</kbd> <kbd>R</kbd>', spoken: 'Pong. Player one uses 1 and Q. Player two uses 4 and R.', pad: 'pong' },
  { name: 'Catch', hint: '<kbd>A</kbd> <kbd>D</kbd> Move the bucket. Catch the falling blocks.', spoken: 'Catch. Use A and D to move the bucket.', pad: 'move' },
  { name: 'Bounce', hint: 'A bouncing sprite. Sit back, or inspect its instructions.', spoken: 'Bounce is an automatic animation. No game input is needed.', pad: 'full' },
  { name: 'Counter', hint: 'Counting from 0 to 255. Open the debugger to follow along.', spoken: 'Counter counts automatically from zero to 255.', pad: 'full' },
  { name: 'Keypad', hint: 'Press any key on the 16-key pad to display its hex digit.', spoken: 'Keypad. Use the on-screen sixteen-key pad or the QWERTY keys.', pad: 'full' },
];
let ready = false;
let lastRom = -2;
let uploaded = null;
let pausedForVisibility = false;
let lastAudioActive = null;
const runnable = [...document.querySelectorAll('.cartridge, .transport-button, .sound-button, .keycap'), $('speed-slider'), $('rom-input'), $('btn-speed-reset')];
runnable.forEach((element) => { element.disabled = true; });

function state(field) { return ready ? Module._UiState(field) : 0; }
function command(value, focus = false) {
  if (!ready) return;
  Module._UiCommand(value);
  update();
  if (focus) canvas.focus({ preventScroll: true });
}
function pad(mode) {
  document.querySelectorAll('[data-pad]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.pad === mode)));
  document.querySelectorAll('.pad-view').forEach((view) => { view.hidden = view.id !== `pad-${mode}`; });
}
function update() {
  if (!ready) return;
  const paused = Boolean(state(0));
  const inspect = Boolean(state(1));
  const rom = state(2);
  const speed = state(3);
  const muted = Boolean(state(4));
  const halted = Boolean(state(7));
  const audioActive = !paused && !muted && !halted && !document.hidden;
  if (parent !== window && audioActive !== lastAudioActive) {
    lastAudioActive = audioActive;
    parent.postMessage({type: "portfolio-project-audio", active: audioActive}, location.origin);
  }
  $('btn-pause').textContent = paused ? '▶ Resume' : 'Ⅱ Pause';
  $('btn-pause').setAttribute('aria-label', paused ? 'Resume emulator' : 'Pause emulator');
  $('btn-debug').textContent = inspect ? '⌘ Back to game' : '⌘ Inspect machine';
  $('btn-debug').setAttribute('aria-pressed', String(inspect));
  $('machine').classList.toggle('inspecting', inspect);
  $('btn-step').hidden = !inspect;
  $('btn-mute').textContent = muted ? 'Sound off' : 'Sound on';
  $('btn-mute').setAttribute('aria-pressed', String(!muted));
  $('system-status').textContent = 'SYSTEM READY';
  $('state-indicator').textContent = halted ? 'Halted · restart to recover' : paused ? 'Paused' : 'Running';
  $('program-counter').textContent = `PC ${state(5).toString(16).toUpperCase().padStart(4, '0')}`;
  $('speed-val').textContent = `${speed * 60} Hz`;
  if (document.activeElement !== $('speed-slider')) $('speed-slider').value = speed;
  document.querySelectorAll('[data-rom]').forEach((button) => {
    const selected = Number(button.dataset.rom) === rom;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('.keycap').forEach((key) => key.classList.toggle('pressed', Boolean(state(100 + Number(key.dataset.key)))));
  if (rom !== lastRom) {
    lastRom = rom;
    const game = games[rom];
    $('game-title').textContent = game ? game.name : uploaded?.name || 'Your ROM';
    $('game-instructions').innerHTML = game ? game.hint : 'A local ROM. Controls depend on the program; use the 16-key pad.';
    canvas.setAttribute('aria-label', `${game ? game.spoken : 'Your uploaded CHIP-8 program.'} Space pauses. H opens the debugger. Tab leaves the game.`);
    pad(game?.pad || 'full');
  }
}

var Module = {
  canvas,
  preRun: [],
  postRun: [function () {
    ready = true;
    document.title = 'CHIP-8 · The Micro Arcade — Matthew Labrador';
    $('loading').classList.add('done');
    runnable.forEach((element) => { element.disabled = false; });
    document.querySelectorAll('.keycap').forEach((element) => { element.disabled = false; });
    update();
  }],
  print: (text) => console.log(text),
  printErr: (text) => console.error(text),
  onAbort: () => {
    ready = false;
    $('loading').classList.remove('done');
    $('loading').querySelector('strong').textContent = 'The machine couldn’t start.';
    $('loading').querySelector('span:last-child').textContent = 'Reload the page to try again. Your browser needs WebAssembly and WebGL.';
    $('system-status').textContent = 'STARTUP FAILED';
  },
};

document.querySelectorAll('[data-rom]').forEach((button) => button.addEventListener('click', () => {
  releaseKeys();
  command(100 + Number(button.dataset.rom));
  $('file-status').textContent = '';
}));
$('btn-pause').addEventListener('click', () => command(0));
$('btn-debug').addEventListener('click', () => command(3));
$('btn-step').addEventListener('click', () => command(5));
$('btn-mute').addEventListener('click', () => command(4));
$('btn-reset').addEventListener('click', restart);
$('speed-slider').addEventListener('input', (event) => command(1000 + Number(event.target.value)));
$('btn-speed-reset').addEventListener('click', () => { command(1011); $('speed-slider').value = 11; });
$('btn-crt').addEventListener('click', () => {
  const enabled = $('frame').classList.toggle('scanlines');
  $('btn-crt').setAttribute('aria-pressed', String(enabled));
  $('btn-crt').textContent = enabled ? 'Scanlines on' : 'Scanlines off';
});

function loadBytes(bytes, name) {
  const nameBytes = new TextEncoder().encode(name);
  const dataPointer = Module._malloc(bytes.length);
  const namePointer = Module._malloc(nameBytes.length + 1);
  try {
    Module.HEAPU8.set(bytes, dataPointer);
    Module.HEAPU8.set(nameBytes, namePointer);
    Module.HEAPU8[namePointer + nameBytes.length] = 0;
    Module._LoadRomFromMemory(dataPointer, bytes.length, namePointer);
  } finally {
    Module._free(dataPointer);
    Module._free(namePointer);
  }
  lastRom = -2;
  update();
}
function restart() {
  if (!ready) return;
  releaseKeys();
  if (state(2) === -1 && uploaded) loadBytes(uploaded.bytes, uploaded.name);
  else command(2);
}
$('rom-input').addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file || !ready) return;
  if (file.size < 1 || file.size > 3584) {
    $('file-status').textContent = 'Choose a classic CHIP-8 ROM between 1 and 3,584 bytes.';
    event.target.value = '';
    return;
  }
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    uploaded = { bytes, name: file.name };
    loadBytes(bytes, file.name);
    $('file-status').textContent = `${file.name} loaded locally. Nothing was uploaded.`;
  } catch {
    $('file-status').textContent = 'That file could not be opened. Try another CHIP-8 ROM.';
  }
  event.target.value = '';
});

const hexKeys = [1,2,3,12,4,5,6,13,7,8,9,14,10,0,11,15];
const physicalKeys = ['1','2','3','4','Q','W','E','R','A','S','D','F','Z','X','C','V'];
hexKeys.forEach((value, index) => {
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'keycap'; button.dataset.key = value;
  button.setAttribute('aria-label', `CHIP-8 key ${value.toString(16).toUpperCase()}, keyboard ${physicalKeys[index]}`);
  button.innerHTML = `${value.toString(16).toUpperCase()}<small>${physicalKeys[index]}</small>`;
  button.disabled = !ready;
  $('pad-full').append(button);
});
function releaseKeys() {
  if (!ready) return;
  for (let value = 0; value < 16; value++) Module._UiKey(value, 0);
  document.querySelectorAll('.keycap').forEach((button) => button.classList.remove('pressed'));
}
document.querySelectorAll('.keycap').forEach((button) => {
  const key = Number(button.dataset.key);
  const release = () => { if (ready) Module._UiKey(key, 0); button.classList.remove('pressed'); };
  button.addEventListener('pointerdown', (event) => {
    if (!ready) return;
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    Module._UiKey(key, 1); button.classList.add('pressed');
  });
  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('lostpointercapture', release);
  button.addEventListener('keydown', (event) => {
    if (!ready || ![' ', 'Enter'].includes(event.key)) return;
    event.preventDefault(); Module._UiKey(key, 1); button.classList.add('pressed');
  });
  button.addEventListener('keyup', (event) => { if ([' ', 'Enter'].includes(event.key)) { event.preventDefault(); release(); } });
  button.addEventListener('blur', release);
});
document.querySelectorAll('[data-pad]').forEach((button) => button.addEventListener('click', () => { releaseKeys(); pad(button.dataset.pad); }));

// Raylib listens on window. UI keyboard events must not also drive the game.
for (const eventName of ['keydown', 'keyup']) {
  document.addEventListener(eventName, (event) => {
    if (event.target !== canvas) { event.stopPropagation(); return; }
    if (event.key === 'Tab' || event.key === 'Escape') {
      event.stopPropagation();
      if (event.key === 'Escape') { event.preventDefault(); $('btn-pause').focus(); }
      releaseKeys();
      return;
    }
    if ([' ', 'Backspace', 'F1', 'F2', 'F3', 'F4', 'F5'].includes(event.key)) event.preventDefault();
    if (event.key === 'Backspace') { event.stopPropagation(); if (eventName === 'keydown' && !event.repeat) restart(); }
  });
}
canvas.addEventListener('click', () => canvas.focus({ preventScroll: true }));
canvas.addEventListener('blur', releaseKeys);
window.addEventListener('blur', releaseKeys);
document.addEventListener('visibilitychange', () => {
  releaseKeys();
  if (!ready) return;
  if (document.hidden) { pausedForVisibility = !state(0); if (pausedForVisibility) command(0); }
  else if (pausedForVisibility) { pausedForVisibility = false; if (state(0)) command(0); }
});
setInterval(() => { if (!document.hidden) update(); }, 120);
