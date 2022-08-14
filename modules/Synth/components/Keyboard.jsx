import { useContext } from 'react';
import { Key } from './Key';
import { SynthContext } from './SynthController';
import styles from './SynthController.module.css';
import { SoundGenerator } from './SoundGenerator';

export function Keyboard() {
	const { notes } = useContext(SynthContext);

	return (
		<>
			<SoundGenerator />
			<div className={styles.flex}>
				{notes.map(({ ...props }, i) => {
					return <Key {...props} key={i} />;
				})}
			</div>
		</>
	);
}
