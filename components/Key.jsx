export function Key({ note, char, color, active, ...props }) {
	return <div className={`key ${color} ${active ? 'active' : ''}`} data-char={char} {...props}>{char}</div>;
}
