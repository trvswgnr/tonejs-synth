import { useEffect } from 'react';

export function useTriggerSynth({ synth, notes, options }) {
	useEffect(() => {
		if (!synth)
			return;

		function keyboardSynthTrigger(e) {
			const type = e.type === 'keydown' ? 'attack' : 'release';
			const { note } = notes.find(note => note.char === e.key) || {};

			if (!note || e.repeat) {
				return false;
			}

			if (type === 'attack') {
				document.querySelector(`[data-char="${e.key}"]`).classList.add('active');
				synth.triggerRelease([note]);
				synth.triggerAttack([note]);
				return true;
			}
			if (type === 'release') {
				document.querySelector(`[data-char="${e.key}"]`).classList.remove('active');
				synth.triggerRelease([note]);
				return true;
			}

			return false;
		}

		function mouseSynthTrigger(e) {
			const type = e.type === 'mousedown' ? 'attack' : 'release';

			if (type === 'attack' && e.target.classList.contains('key')) {
				const { note } = notes.find(note => note.char === e.target.innerHTML) || {};
				synth.releaseAll();
				synth.triggerAttack(note);
				return true;
			}

			if (type === 'release') {
				synth.releaseAll();
				return true;
			}

			return false;
		}

		function addEvents() {
			document.addEventListener('keydown', keyboardSynthTrigger);
			document.addEventListener('keyup', keyboardSynthTrigger);
			document.addEventListener('mousedown', mouseSynthTrigger);
			document.addEventListener('mouseup', mouseSynthTrigger);
		}

		function removeEvents() {
			document.removeEventListener('keydown', keyboardSynthTrigger);
			document.removeEventListener('keyup', keyboardSynthTrigger);
			document.removeEventListener('mousedown', mouseSynthTrigger);
			document.removeEventListener('mouseup', mouseSynthTrigger);
		}

		addEvents();
		return removeEvents;
	}, [notes, options, synth]);
}
