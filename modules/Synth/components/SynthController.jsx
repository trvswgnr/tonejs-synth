// import { Keyboard } from './Keyboard';
import { ControlPanel } from './ControlPanel';
import { createContext, useEffect, useState } from 'react';
import { generateNotes } from '../lib';
import styles from './SynthController.module.css';
import { Sequencer } from './Sequencer';
import {Keyboard} from './Keyboard';
import { Gain } from 'tone';

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
	const [gain, setGain] = useState(null);

	useEffect(() => setNotes(generateNotes(18, options.octave)), [options.octave]);

	useEffect(() => setGain(new Gain(0.8).toDestination()), []);

	const context = {
		options, setOptions,
		notes, setNotes,
		gain, setGain,
	};

	return (
		<SynthContext.Provider value={context}>
			<div className={styles.synth}>
				<ControlPanel />
				<Keyboard />
				<Sequencer />
			</div>
		</SynthContext.Provider>
	);
}
