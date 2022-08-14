import styles from './SynthController.module.css';
import { Button } from './Button';
import {Radio } from './Radio';

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
	return (label || value) && <h3 className={styles['control-info']}><span className="control-label">{label}</span>{(label && value) && ': '}<span className={styles['fw-normal']}>{value}</span></h3>;
}

export function MultiSelect({ active, name, label, value, options, onChange }) {
	return (
		<div className={styles['control-item']}>
			<Label label={label} value={value} />
			<div className={styles.flex}>
				{options.map(({ label, value }) => {
					return <Button active={active === value} name={name} key={value} onClick={() => onChange(value)}>{label}</Button>;
				})}
			</div>
		</div>
	);
}

export const Control = {
	Group,
	Label,
	MultiSelect,
};
