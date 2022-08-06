import React, {createContext, useState, useMemo} from 'react';
import { generateNotes } from '../lib/utils';
import {PolySynth, Synth} from 'tone';
import { Key } from './Key';

const SynthContext = createContext();

export const SynthController = () => {
	const [options, setOptions] = useState({
		oscillator: 'square',
		detune: 0,
		volume: -3,
		octave: 3
	});

	const [notes, setNotes] = useState(generateNotes(18, options.octave));
	
	React.useEffect(() => {
		setNotes(generateNotes(18, options.octave));
	}, [options.octave]);

	React.useEffect(() => {
		const synth = new PolySynth(Synth, {
			oscillator: {
				type: options.oscillator,
			}
		});

		synth.toDestination();
		
		const keyboardSynthTrigger = (e) => {
			const type = e.type === 'keydown' ? 'attack' : 'release';
			const { note } = notes.find(note => note.char === e.key) || {};
			if (!note || e.repeat) return;
			if (type === 'attack') {
				document.querySelector(`[data-char="${e.key}"]`).classList.add('active');
				synth.triggerRelease([note]);
				synth.triggerAttack([note]);
				return;
			}
			if (type === 'release') {
				document.querySelector(`[data-char="${e.key}"]`).classList.remove('active');
				synth.triggerRelease([note]);
				return;
			}
			return false;
		};

		const mouseSynthTrigger = (e) => {
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
		};		

		document.addEventListener('keydown', keyboardSynthTrigger);
		document.addEventListener('keyup', keyboardSynthTrigger);
		document.addEventListener('mousedown', mouseSynthTrigger);
		document.addEventListener('mouseup', mouseSynthTrigger);

		return () => {
			document.removeEventListener('keydown', keyboardSynthTrigger);
			document.removeEventListener('keyup', keyboardSynthTrigger);
			document.removeEventListener('mousedown', mouseSynthTrigger);
			document.removeEventListener('mouseup', mouseSynthTrigger);
		};
	}, [notes, options]);

	return (
		<SynthContext.Provider value={{options, setOptions, notes, setNotes}}>
			<div className="synth">
				<ControlPanel />
				<Keyboard />
			</div>
		</SynthContext.Provider>
	);
};

export const ControlPanel = () => {
	const {options, setOptions} = React.useContext(SynthContext);

	const updateSynth = (prop, val) => {
		setOptions({ ...options, [prop]: val });
	};

	return (
		<div className="controls">
			<ControlButtons label="Octave">
				<Button onClick={() => updateSynth('octave', options.octave - 1)}>-</Button>
				<Button onClick={() => updateSynth('octave', options.octave + 1)}>+</Button>
			</ControlButtons>
		</div>
	);
};

export const ControlButtons = ({ label, children }) => {
	return (
		<div className="control-item">
			<p className="control-label">{label}</p>
			<div className="button-group">
				{children}
			</div>
		</div>
	);
};

export const Button = ({children, ...props}) => <button type="button" className="button" {...props}>{children}</button>;

export const Keyboard = () => {
	const {notes} = React.useContext(SynthContext);

	return (
		<div className="keyboard">
			{ notes.map(({note, color, char, active}, i) => {
				const props = { note, color, char, active };
				return <Key {...props} key={i} />;
			}) }
		</div>
	);
};


