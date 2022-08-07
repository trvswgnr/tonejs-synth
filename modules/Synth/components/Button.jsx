import styles from './Button.module.css';

export function Button({ active, type, children, ...props }) {
	let style = styles.button;
	
	if (type && styles[type]) {
		style = `${style} ${styles[type]}`;
	}

	if (active) {
		style = `${style} ${styles.active}`;
	}

	return <div className={style} {...props}>{children}</div>;
}
