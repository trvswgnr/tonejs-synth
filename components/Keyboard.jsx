import React from 'react';
import { Key } from './Key';
import { SynthContext } from './Synth';


export function Keyboard() {
	const { notes } = React.useContext(SynthContext);

	return (
		<div className="keyboard">
			{notes.map(({ note, color, char, active }, i) => {
				const props = { note, color, char, active };
				return <Key {...props} key={i} />;
			})}
		</div>
	);
}
