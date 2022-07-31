import './style.css';
import { PolySynth, Synth, Transport, Context, setContext, getContext, Meter, Compressor } from 'tone';
import * as Tone from 'tone';
import { generateNotes } from './util';

const context = new Context({
	latencyHint: 'interactive',
	lookAhead: 0.01,
});
setContext(context);

const selectors = {
	audio: '.audio-player',
	keys: '.keys',
	octaveDown: '.octave .down',
	octaveUp: '.octave .up',
	volume: '.volume .range',
	record: '.record',
	meter: '.meter',
};

const elements = Object.entries(selectors).reduce((acc, [key, value]) => {
	acc[key] = document.querySelector(value);
	return acc;
} , {});

let volume = 0;
const synth = new PolySynth(Synth, {
	oscillator: {
		type: 'triangle',
	},
	envelope: {
		attack: 0.01,
		decay: 0.1,
		sustain: 0.5,
		release: 1
	},
	volume: Number(elements.volume.value),
});


const compressor = new Compressor(-30, 20);
const reverb = new Tone.Reverb(4.5, 0.1);
const autoPanner = new Tone.AutoPanner("4n").start();
const meter = new Meter();
const gain = new Tone.Gain();
const dest = context.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);

synth.chain(reverb, autoPanner, gain, compressor);
synth.chain(gain, compressor);
compressor.chain(meter, dest);
meter.toDestination();

let level = 0;
setInterval(() => {
	level = meter.getValue();
	console.log(meter.getValue());
	elements.meter.value = isFinite(level) ? level : -60; 
}, 200);

Transport.on('start', () => recorder.start());
Transport.on('stop', () => recorder.stop());

const chunks = [];
recorder.ondataavailable = e => chunks.push(e.data);
recorder.onstop = () => {
	const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
	elements.audio.src = URL.createObjectURL(blob);
};

elements.record.addEventListener('click', (e) => {
	if (e.target.classList.contains('active')) {
		Transport.stop();
		e.target.classList.remove('active');
		elements.record.innerHTML = 'Record';
		elements.record.style.color = '#fff';
		return false;
	}
	Transport.start();
	elements.record.classList.add('active');
	elements.record.innerHTML = 'Stop';
	elements.record.style.color = 'red';
	return true;
});


let notes = generateNotes(18);
const activeNotes = [];


/**
* Release all active notes.
*
* @returns {void} void
*/
const releaseAll = () => {
	for (const { el } of notes) {
		el.classList.remove('active');
	}
	synth.releaseAll();
	activeNotes.length = 0;
	return true;
}

/**
* Trigger the synth attack or release from a keyboard event.
*
* @param {KeyboardEvent} e The keyboard event.
* @returns {boolean} Whether the event was handled as expected.
*/
const keyboardSynthTrigger = (e) => {
	const type = e.type === 'keydown' ? 'attack' : 'release';
	const { note, el } = notes.find(note => note.key === e.key) || {};

	if (!note || e.repeat) {
		return false;
	}

	if (type === 'attack') {
		activeNotes.push(note);
		el.classList.add('active');
		synth.triggerRelease([note]);
		synth.triggerAttack(note);
		return true;
	}

	if (type === 'release') {
		el.classList.remove('active');
		activeNotes.splice(activeNotes.indexOf(note), 1);
		synth.triggerRelease([note]);
		return true;
	}

	return false;
}

/**
* Trigger the synth attack or release from a mouse event.
*
* @param {MouseEvent} e The mouse event.
* @returns {boolean} Whether the event was handled.
*/
const mouseSynthTrigger = (e) => {
	const type = e.type === 'mousedown' ? 'attack' : 'release';

	if (type === 'attack' && e.target.classList.contains('key')) {
		const { note, el } = notes.find(note => note.el === e.target);
		activeNotes.push(note);
		el.classList.add('active');
		synth.triggerAttack(note);
		return true;
	}

	if (type === 'release') {
		releaseAll();
		return true;
	}

	return false;
};

/**
* Add the generated note elements to the page.
*
* @param {HTMLElement} wrapper The element to add the notes to. Replaces the existing contents.
* @returns {void} void
*/
const addNotesToKeyboard = (wrapper) => wrapper.replaceChildren(...notes.map(key => key.el));

const changeOctave = (e) => {
	const changeBy = e.target.classList.contains('up') ? 1 : -1;
	const currentOctave = notes[0].octave;
	notes = generateNotes(18, currentOctave + changeBy);
	addNotesToKeyboard(elements.keys);
}

// change the volume of the synth
const changeVolume = (e) => {
	volume = Math.round(e.target.value);
	synth.volume.value = volume;
}

// add the initial generated notes to the DOM.
addNotesToKeyboard(elements.keys);

// add event listeners
document.addEventListener('keydown', keyboardSynthTrigger);
document.addEventListener('keyup', keyboardSynthTrigger);
document.addEventListener('mousedown', mouseSynthTrigger);
document.addEventListener('mouseup', mouseSynthTrigger);
elements.octaveDown.addEventListener('click', changeOctave);
elements.octaveUp.addEventListener('click', changeOctave);
elements.volume.addEventListener('change', changeVolume);
