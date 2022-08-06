import React from 'react';
import { generateNotes } from '../lib/utils';
import {PolySynth, Synth} from 'tone';

const SynthContext = React.createContext();

export const SynthController = () => {
	const [options, setOptions] = React.useState({
		oscillator: 'square',
		detune: 0,
		volume: -3,
		octave: 3,
		maxVoices: 3
	});

	const [notes, setNotes] = React.useState(generateNotes(18, options.octave));

	
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
			const { note } = notes.find(note => note.key === e.key) || {};
		
			if (!note || e.repeat) {
				return false;
			}
		
			if (type === 'attack') {
				// el.classList.add('active');
				synth.triggerRelease([note]);
				synth.triggerAttack(note);
				return true;
			}
		
			if (type === 'release') {
				synth.triggerRelease([note]);
				return true;
			}
		
			return false;
		};

		window.addEventListener('keydown', keyboardSynthTrigger);
		window.addEventListener('keyup', keyboardSynthTrigger);
		return () => {
			window.removeEventListener('keydown', keyboardSynthTrigger);
			window.removeEventListener('keyup', keyboardSynthTrigger);
		};
	}, [notes, options]);

	const elementRef = React.useRef();

	React.useEffect(() => {
		const divElement = elementRef.current;
	}, []);

	const KeyboardComponent = Keyboard;

	return (
		<SynthContext.Provider value={{options, setOptions, notes, setNotes}}>
			<div className="synth">
				<ControlPanel />
				{[1].map((x, i) => {
					x = <KeyboardComponent key={i} />;
					console.log(x);
					return x;
				})}
				<KeyboardComponent />
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
				<Button onClick={() => updateSynth(octave, options.octave + 1)}>+</Button>
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
			{ notes.map(({note, key}, i) => {
				return <Key note={note} keyname={key} key={i} />;
			}) }
		</div>
	);
};

export const Key = ({note, keyname}) => {
	return <div className={`key ${note.includes('#') ? 'black' : 'white'}`}>{keyname}</div>;
};
