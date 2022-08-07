import { Key } from './Key';
import styles from './SynthController.module.css';
import { useKeyPress, useSynth } from '../hooks';
import { useEffect, useContext, useRef, useState } from 'react';
import { SynthContext } from './SynthController';

export function Keyboard() {
	const { notes } = useContext(SynthContext);

	return (
		<div className={styles.flex}>
			{notes.map(({ ...props }, i) => {
				return <Key {...props} key={i} />;
			})}
		</div>
	);
}
