import styles from './SynthController.module.css';

export function Buttons({ label, value, children }) {
	return (
		<div className="control-item control-item-buttons">
			<Label label={label} value={value} />
			<div className={styles.flex}>
				{children}
			</div>
		</div>
	);
}

export function Label({ label, value }) {
	return (label || value) && <h3 className="control-label">{label}{(label && value) && ': '}{value}</h3>;
}

export const Control = {
	Buttons,
	Label,
};
