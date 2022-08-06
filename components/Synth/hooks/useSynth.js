import { useState, useEffect } from 'react';
import { PolySynth, Synth, Context, setContext } from 'tone';

export const useSynth = (options) => {
	const [synth, setSynth] = useState(null);
	useEffect(() => {
		const synth = new PolySynth(Synth, {
			oscillator: {
				type: options.oscillator
			}
		});

		setSynth(synth);

		const context = new Context({
			latencyHint: 'interactive',
			lookAhead: 0,
		});
		setContext(context);
		
		synth.toDestination();

		return () => {
			synth.dispose();
			setSynth(null);
		};
	}, [options]);

	return synth;
};
