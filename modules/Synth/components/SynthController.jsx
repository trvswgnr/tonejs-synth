import { Keyboard } from './Keyboard';
import { ControlPanel } from './ControlPanel';
import styles from './SynthController.module.css';
import { createContext, useEffect, useState } from 'react';
import { generateNotes } from '../lib';

export const SynthContext = createContext();

export function SynthController() {
	const [options, setOptions] = useState({
		oscillator: 'square',
		detune: 0,
		volume: -3,
		octave: 3
	});
	
	const [notes, setNotes] = useState(generateNotes(18, options.octave));
	useEffect(() => {
		console.log('notes changed');
		setNotes(generateNotes(18, options.octave));
	}, [options]);

	return (
		<SynthContext.Provider value={{ options, setOptions, notes }}>
			<div className={styles.synth}>
				<ControlPanel />
				<Keyboard />
			</div>
		</SynthContext.Provider>
	);
}
