import style from './SynthController.module.css';

export function ControlButtons({ label, children }) {
	return (
		<div className="control-item">
			<p className="control-label">{label}</p>
			<div className={style.flex}>
				{children}
			</div>
		</div>
	);
}
