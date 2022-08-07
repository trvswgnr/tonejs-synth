import { useEffect, useContext } from 'react';
import { useKeyPress, useSynth } from '../hooks';
import { SynthContext } from './SynthController';

export function SoundGenerator() {
	const { options, notes } = useContext(SynthContext);
	const { keyPressed, keyReleased } = useKeyPress();
	const synth = useSynth(options);

	useEffect(() => {
		const note = notes.find(note => note.char === (keyPressed || keyReleased));

		if (!note)
			return;

		try {
			if (keyPressed) {
				synth.triggerAttack([note.note]);
			}

			if (keyReleased) {
				synth.triggerRelease([note.note]);
			}
		} catch (e) {
			console.log(e);
		}
	}, [keyPressed, keyReleased, notes, synth]);
}
