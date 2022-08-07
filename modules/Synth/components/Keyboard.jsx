import { Key } from './Key';
import styles from './SynthController.module.css';
import { useKeyPress, useSynth } from '../hooks';
import { useEffect, useContext, useRef, useState } from 'react';
import { SynthContext } from './SynthController';

export function Keyboard() {
	const { options, notes } = useContext(SynthContext);
	const {keyPressed, keyReleased} = useKeyPress();
	const synth = useSynth(options);

	useEffect(() => {
		console.log('notes', notes);
		const note = notes.find(note => note.char === (keyPressed || keyReleased));

		if (!note) return;

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

	return (
		<div className={styles.flex}>
			{notes.map(({ ...props }, i) => {
				return <Key {...props} key={i} />;
			})}
		</div>
	);
}
