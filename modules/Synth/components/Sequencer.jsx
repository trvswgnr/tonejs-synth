import { useSynth } from "../hooks";
import { Button } from "./Button";
import { SynthContext } from "./SynthController";
import * as Tone from 'tone';
import { useCallback, useContext, useEffect, useState } from "react";

export function Sequencer() {
	const [playing, setPlaying] = useState(false);
	const {options, gain} = useContext(SynthContext);
	const synth = useSynth(options);
		
	const handleClick = useCallback(() => {
		setPlaying(!playing);
	} , [playing]);

	useEffect(() => {
		if (!synth || !gain) {
			return;
		}
		
		synth.connect(gain);
		// const synth = new Tone.MonoSynth({
		// 	oscillator: {
		// 		type: options.oscillator,
		// 	},
		// 	envelope: {
		// 		attack: 0.001,
		// 		decay: 0.1,
		// 		sustain: 0.5,
		// 		release: 0.1,
		// 	},
		// 	filter: {
		// 		Q: 10,
		// 		type: 'highpass',
		// 		frequency: 20000,
		// 	},
		// }).toDestination();
		const seq = new Tone.Sequence((time, note) => {
			synth.triggerAttackRelease(note, 0.1, time);
			// subdivisions are given as subarrays
		}, ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]);

		if (playing) {
			seq.start(0);
			Tone.Transport.start();
		}

		return () => {
			seq.stop();
			Tone.Transport.stop();
		};
	} , [playing, options.oscillator, gain, synth]);


	return (
		<div>
			<Button onClick={handleClick}>{!playing ? 'Play' : 'Pause' }</Button>
			<p>{options.oscillator}</p>
		</div>
	);
}
