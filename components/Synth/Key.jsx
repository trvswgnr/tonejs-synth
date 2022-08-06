import styles from './styles/Key.module.css';

export function Key({ note, char, color, active, ...props }) {
	return <div className={`${styles.key} ${styles[color]} ${!active || styles.active}`} data-char={char} {...props}>{char}</div>;
}
