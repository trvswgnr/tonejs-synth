import styles from './Button.module.css';

export function Button({ children, type, ...props }) {
	let style = styles.button;
	if (type && styles[type]) {
		style = `${style} ${styles[type]}`;
	}
	return <div className={style} {...props}>{children}</div>;
}
