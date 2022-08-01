const synth = new Tone.Synth().toDestination();
const keys = Array.from(document.querySelectorAll('.key'));

document.addEventListener('mousedown', (e) => {
  if (!e.target.classList.contains('key')) {
    return;
  }
  synth.triggerAttack(e.target.dataset.note);
  e.target.classList.add('active');
});

document.addEventListener('mouseup', () => {
  keys.forEach(key => key.classList.remove('active'));
  synth.triggerRelease();
});

document.addEventListener('keydown', (e) => {
  const key = keys.find(key => key.dataset.key === e.key);
  if (!key) {
    return;
  }
  key.classList.add('active');
  synth.triggerAttack(key.dataset.note);
});

document.addEventListener('keyup', () => {
  keys.forEach(key => key.classList.remove('active'));
  synth.triggerRelease();
});
