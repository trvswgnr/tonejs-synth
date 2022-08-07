import styles from './Button.module.css';

export function Button({ children, ...props }) {
	return <div className={styles.button} {...props}>{children}</div>;
}
