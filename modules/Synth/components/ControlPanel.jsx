import { useContext } from 'react';
import { SynthContext } from './SynthController';
import { Control } from './Control';
import { Button } from './Button';
import styles from './SynthController.module.css';

export function ControlPanel() {
	const { options, setOptions } = useContext(SynthContext);

	const updateOption = (prop, val) => {
		setOptions({ ...options, [prop]: val });
	};

	return (
		<div className={styles.controls}>
			<Control.Group label="Octave" value={options.octave}>
				<Button onClick={() => updateOption('octave', options.octave - 1)}>-</Button>
				<Button onClick={() => updateOption('octave', options.octave + 1)}>+</Button>
			</Control.Group>

			<Control.Group>
				<Button type="panic" onClick={() => updateOption('panic')}>!</Button>
			</Control.Group>
		</div>
	);
}
