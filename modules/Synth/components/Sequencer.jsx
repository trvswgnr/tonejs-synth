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
		const seq = new Tone.Sequence((time, note) => {
			if (note === '_') {
				return;
			}
			let octave = note.replace(/[^0-9-]/gi, ''); // get octave
			note = note.replace(/[0-9-]/gi, ''); // remove octave
			octave = options.octave + Number(octave); // add octaves
			synth.triggerAttackRelease(note + octave, 0.1, time); // play note
		}, ["E0", ["E0", "_", "E0"], "G0", ["A0", "G0"]]); // subdivisions are given as subarrays

		if (playing) {
			seq.start(0);
			Tone.Transport.start();
		}

		return () => {
			seq.stop();
			Tone.Transport.stop();
		};
	} , [playing, options, gain, synth]);


	return <Button onClick={handleClick}>{!playing ? 'Play' : 'Pause' }</Button>;
}
