import './style.css';
import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();

const keys = Array.from(document.querySelectorAll('.key'));

document.addEventListener('mousedown', (e) => {
	if (!e.target.classList.contains('key')) {
		return;
	}
	e.target.classList.add('active');
	synth.triggerAttack(e.target.dataset.note);
});

document.addEventListener('mouseup', () => {
	for (const key of keys) {
		key.classList.remove('active');
	}
	synth.triggerRelease();
});

document.addEventListener('keydown', (e) => {
	const key = keys.find(key => key.dataset.key === e.key);
	console.log(key);
	if (!key) {
		return;
	}
	key.classList.add('active');
	synth.triggerAttack(key.dataset.note);
});

document.addEventListener('keyup', () => {
	for (const key of keys) {
		key.classList.remove('active');
	}
	synth.triggerRelease();
});
