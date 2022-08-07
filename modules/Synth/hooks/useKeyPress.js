import { useState, useEffect, useCallback, useMemo } from 'react';

export function useKeyPress() {
	const [keyPressed, setKeyPressed] = useState(null);
	const [keyReleased, setKeyReleased] = useState(null);
	const [activeKeys, setActiveKeys] = useState([]);

	const keyEventHandler = useCallback(({ key, type, repeat }) => {
		if (!key || repeat) {
			return;
		}

		if (type === 'keydown') {
			setKeyReleased(null); // reset keyReleased if key
			setKeyPressed(key); // set to the key that was pressed

			setActiveKeys([...activeKeys, key]); // add char to active keys array
			return;
		}

		setKeyPressed(null); // set keyPressed to null
		setKeyReleased(key); // set released to the key that was released

		setActiveKeys(activeKeys.filter(k => k !== key)); // remove char from active keys array
		return;
	}, [activeKeys]);

	const mouseEventHandler = useCallback(({ type, target }) => {
		if (type === 'pointerdown') {
			setKeyReleased(null);
			setKeyPressed(target.dataset.char);
			setActiveKeys([...activeKeys, target.dataset.char]);
			return;
		}

		setKeyPressed(null);
		setKeyReleased(keyPressed);
		setActiveKeys([]);
		return;
	}, [activeKeys, keyPressed]);

	useEffect(() => {
		window.addEventListener("keydown", keyEventHandler);
		window.addEventListener("keyup", keyEventHandler);
		window.addEventListener("pointerdown", mouseEventHandler);
		window.addEventListener("pointerup", mouseEventHandler);

		return () => {
			window.removeEventListener("keydown", keyEventHandler);
			window.removeEventListener("keyup", keyEventHandler);
			window.removeEventListener("pointerdown", mouseEventHandler);
			window.removeEventListener("pointerup", mouseEventHandler);
		};
	}, [keyEventHandler, mouseEventHandler]);

	return { keyPressed, keyReleased, activeKeys };
}
