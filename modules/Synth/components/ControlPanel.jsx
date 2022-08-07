import { Button } from './Button';
import { Control } from './Control';
import { useContext, useState } from 'react';
import { SynthContext } from './SynthController';
import styles from './SynthController.module.css';

export function ControlPanel() {
	const { options, setOptions } = useContext(SynthContext);

	const updateOption = (prop, val) => {
		setOptions({ ...options, [prop]: val });
	};

	return (
		<div className={styles.controls}>
			<Control.Buttons label="Octave" value={options.octave}>
				<Button onClick={() => updateOption('octave', options.octave - 1)}>-</Button>
				<Button onClick={() => updateOption('octave', options.octave + 1)}>+</Button>
			</Control.Buttons>
		</div>
	);
}
