import { useContext } from 'react';
import { Button } from './Button';
import { ControlButtons } from './ControlButtons';
import { SynthContext } from './Synth';

export function ControlPanel() {
	const { options, setOptions } = useContext(SynthContext);

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
}
