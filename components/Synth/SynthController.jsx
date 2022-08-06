import React, { createContext, useState } from 'react';
import { Keyboard } from './Keyboard';
import { ControlPanel } from './ControlPanel';
import { useSynth, useNotes, useTriggerSynth } from './hooks';
import styles from './styles/Synth.module.css';

export const SynthContext = createContext();

export function SynthController() {
	const [options, setOptions] = useState({
		oscillator: 'square',
		detune: 0,
		volume: -3,
		octave: 3
	});

	const synth = useSynth(options);
	const notes = useNotes(options);

	useTriggerSynth({ synth, notes, options });

	return (
		<SynthContext.Provider value={{ options, setOptions, notes }}>
			<div className={styles.synth}>
				<ControlPanel />
				<Keyboard />
			</div>
		</SynthContext.Provider>
	);
}
