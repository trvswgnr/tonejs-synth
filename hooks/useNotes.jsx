import { useState, useEffect } from 'react';
import { generateNotes } from '../lib/utils';

export const useNotes = (options) => {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		setNotes(generateNotes(18, options.octave));
	}, [options]);

	return notes;
};
