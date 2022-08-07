import { useState, useEffect, useMemo } from "react";

export function useOptions(args) {
	const [options, setOptions] = useState({
			oscillator: 'square',
			detune: 0,
			volume: -3,
			octave: 3
		});

	useEffect(() => {
		if (!args) {
			return console.log('no args');
		}
		setOptions(args);

		return () => {
			setOptions({
				oscillator: 'square',
				detune: 0,
				volume: -3,
				octave: 3
			});
		};
	} , [args]);

	return options;
}
