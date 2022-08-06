import { useState, useEffect } from 'react';
import { generateNotes } from '../utils';

export const useNotes = (options) => {
	const [notes, setNotes] = useState(generateNotes(18, options.octave));

	useEffect(() => {
		setNotes(generateNotes(18, options.octave));
	}, [options]);

	return notes;
};
