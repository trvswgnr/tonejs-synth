import { useKeyPress } from '../hooks';
import styles from './Key.module.css';

export function Key({ note, char, color, active, ...props }) {
	const { activeKeys } = useKeyPress();
	const styleActive = active || activeKeys.includes(char) ? styles.active : '';
	return <div className={`${styles.key} ${styles[color]} ${styleActive}`} data-char={char} {...props}>{char}</div>;
}
