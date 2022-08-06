export function ControlButtons({ label, children }) {
	return (
		<div className="control-item">
			<p className="control-label">{label}</p>
			<div className="button-group">
				{children}
			</div>
		</div>
	);
}
