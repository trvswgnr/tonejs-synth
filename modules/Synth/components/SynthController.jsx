import { Keyboard } from './Keyboard';
import { ControlPanel } from './ControlPanel';
import { createContext, useEffect, useState } from 'react';
import { generateNotes } from '../lib';
import { SoundGenerator } from './SoundGenerator';
import styles from './SynthController.module.css';

export const SynthContext = createContext();

export function SynthController(props) {
	const defaultOptions = {
		oscillator: 'square',
		detune: 0,
		volume: -3,
		octave: 3,
		...props
	};

	const [options, setOptions] = useState(defaultOptions);
	const [notes, setNotes] = useState(generateNotes(18, options.octave));

	useEffect(() => setNotes(generateNotes(18, options.octave)), [options.octave]);

	const context = {
		options, setOptions,
		notes, setNotes
	};

	return (
		<SynthContext.Provider value={context}>
			<SoundGenerator />
			<div className={styles.synth}>
				<ControlPanel />
				<Keyboard />
			</div>
		</SynthContext.Provider>
	);
}
