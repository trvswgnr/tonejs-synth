import styles from './SynthController.module.css';

export function Group({ label, value, children }) {
	return (
		<div className={styles['control-item']}>
			<Label label={label} value={value} />
			<div className={styles.flex}>
				{children}
			</div>
		</div>
	);
}

export function Label({ label, value }) {
	console.log(styles);
	return (label || value) && <h3 className="control-info"><span className="control-label">{label}</span>{(label && value) && ': '}<span className={styles['fw-normal']}>{value}</span></h3>;
}

export const Control = {
	Group,
	Label,
};
