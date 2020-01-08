import React, { useContext, useEffect, useState } from "react";
import { StdinContext, Box, Color, useInput } from "ink";
import readline from "readline";
import FocusContext from "./FocusContext";

function useFocusSelector() {
	const [elementList, setElementList] = useState([]);
	const [focusedIndex, setFocusedIndex] = useState(0);

	function register(ref) {
		elementList.push(ref);
		setElementList(elementList.slice(0)); // don't alter elementList reference, but clone the array
	}

	function hasFocus(ref) {
		return focusedIndex === elementList.findIndex(e => e === ref);
	}

	function focusPrevious() {
		let newIndex = focusedIndex - 1;
		if (newIndex < 0) {
			newIndex = elementList.length - 1;
		}

		setFocusedIndex(newIndex);
	}

	function focusNext() {
		let newIndex = focusedIndex + 1;
		if (newIndex >= elementList.length) {
			newIndex = 0;
		}

		setFocusedIndex(newIndex);
	}

	const { stdin, isRawModeSupported, setRawMode } = useContext(StdinContext);

	useEffect(() => {
		if (isRawModeSupported) {
			setRawMode(true);
		}

		return () => {
			if (isRawModeSupported) {
				setRawMode(false);
			}
		};
	}, [isRawModeSupported, setRawMode]);

	useEffect(() => {
		const handleData = (ch, key) => {
			if (key.name === "tab") {
				if (key.shift) {
					focusPrevious();
				} else {
					focusNext();
				}
			}
		};

		readline.emitKeypressEvents(stdin);
		stdin.on("keypress", handleData);

		return () => {
			stdin.off("keypress", handleData);
		};
	}, [stdin, focusNext, focusPrevious]);

	// useInput((input, key) => {
	// 	console.log(input, key);
	// 	if (key.return) {
	// 		// should be "tab" but we need something to tell the subcomponent to not respond in this case + tab is not mapped by ink
	// 		if (key.shift) {
	// 			// "shift" is not working
	// 			focusPrevious();
	// 		} else {
	// 			focusNext();
	// 		}
	// 	}
	// });

	return { register, hasFocus, elementList, focusedIndex };
}

function App({ children }) {
	const { register, hasFocus, elementList, focusedIndex } = useFocusSelector();

	return (
		<FocusContext.Provider value={{ register, hasFocus }}>
			{children}

			<Color gray>
				<Box flexDirection="column">
					<Box>-----------------------------</Box>
					<Box>Debug:</Box>
					<Box>Nb focusable elements : {elementList.length}</Box>
					<Box>Focused index : {focusedIndex}</Box>
				</Box>
			</Color>
		</FocusContext.Provider>
	);
}

export default App;
