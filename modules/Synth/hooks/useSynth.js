import { useState, useEffect } from 'react';
import { PolySynth, Synth, Context, setContext } from 'tone';

export const useSynth = (options) => {
	const [synth, setSynth] = useState(null);
	useEffect(() => {
		if (!options) {
			return;
		}
		const synth = new PolySynth(Synth, {
			oscillator: {
				type: options.oscillator
			}
		});

		setSynth(synth);
		
		return () => {
			if (synth) {
				synth.releaseAll();
				setSynth(null);
			}
		};
	}, [options]);

	return synth;
};
