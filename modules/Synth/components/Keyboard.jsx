import { useContext } from 'react';
import { Key } from './Key';
import { SynthContext } from './SynthController';
import styles from './SynthController.module.css';

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
