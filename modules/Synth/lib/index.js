import { Frequency } from 'tone';
import { useKeyPress } from '../hooks/useKeyPress';

/**
 * Generate note names for a specified number of notes.
 *
 * @param {number} numNotes The number of notes to generate.
 * @param {number} octave The octave to start from.
 * @returns {string[]} Array of note names with their octave.
 */
export function generateNoteNames(numNotes, octave = 3) {
	const noteNames = [];
	let note = `C${octave}`;
	for (let i = 0; i < numNotes; i++) {
		noteNames.push(note);
		note = Frequency(note).transpose(1).toNote();
	}
	return noteNames;
}

/**
 * Create a DOM element for a note.
 * 
 * @param {string} note The note name.
 * @returns {HTMLElement} The created element.
 */
export function createNoteEl(note) {
	const noteEl = document.createElement('div');
	const color = note.includes('#') ? 'black' : 'white';
	noteEl.classList.add('key', color);
	return noteEl;
}

/**
 * Generate an array of notes with their properties.
 *
 * @param {number} numNotes The number of notes to generate.
 * @param {number} octave The octave to start from.
 * @returns {object[]} Array of notes with their properties.
 */
export function generateNotes(numNotes, octave) {
	const notes = [];
	const noteNames = generateNoteNames(numNotes, octave);
	const chars = 'awsedftgyhujkolp;\''.split('');

	for (let i = 0; i < noteNames.length; i++) {
		const note = noteNames[i];
		notes.push({
			note: note,
			frequency: Frequency(note).toFrequency(),
			char: chars[i] ?? '',
			octave: Number(note.slice(-1)),
			color: note.includes('#') ? 'black' : 'white',
			active: false
		});
	}
	return notes;
}
