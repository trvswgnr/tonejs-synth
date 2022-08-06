import React, { createContext, useState } from 'react';
import { Keyboard } from './Keyboard';
import { ControlPanel } from './ControlPanel';
import { useSynth, useNotes, useTriggerSynth } from '../hooks/index';

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
			<div className="synth">
				<ControlPanel />
				<Keyboard />
			</div>
		</SynthContext.Provider>
	);
}
