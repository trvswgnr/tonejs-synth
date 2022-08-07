import { Button } from './Button';
import { ControlButtons } from './ControlButtons';
import { useOptions } from '../hooks';
import styles from './SynthController.module.css';
import { useContext, useState } from 'react';
import { SynthContext } from './SynthController';

export function ControlPanel() {
	const {options, setOptions} = useContext(SynthContext);


	const updateSynth = (prop, val) => {
		setOptions({ ...options, [prop]: val });
		console.log(options);
	};

	return (
		<div className={styles.controls}>
			<ControlButtons label="Octave">
				<span>{options.octave}</span>
				<Button onClick={() => updateSynth('octave', options.octave - 1)}>-</Button>
				<Button onClick={() => updateSynth('octave', options.octave + 1)}>+</Button>
			</ControlButtons>
		</div>
	);
}
