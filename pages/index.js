import Head from 'next/head';
import { SynthController } from '../modules/Synth';

export default function Home() {
	return (
		<>
			<Head>
				<title>Tone.js Synth</title>
				<meta name="description" content="Playable synthesizer build with Tone.js, Next.js, and React. Works best on desktop with a modern browser." />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="app">
				<SynthController />
			</main>
		</>
	);
}
