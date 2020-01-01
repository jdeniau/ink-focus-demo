import React, { useState } from "react";
import { useInput, Box, Color } from "ink";
import FocusContext from "./FocusContext";

function App({ children }) {
	const [elementList, setElementList] = useState([]);
	const [focusedIndex, setFocusedIndex] = useState(0);

	function register(ref) {
		elementList.push(ref);
		setElementList(elementList.slice(0)); // don't alter elementList reference, but clone the array
	}

	function hasFocus(ref) {
		return focusedIndex === elementList.findIndex(e => e === ref);
	}

	function focusPrevious(input) {
		let newIndex = focusedIndex - 1;
		if (newIndex < 0) {
			newIndex = elementList.length - 1;
		}

		setFocusedIndex(newIndex);
	}

	function focusNext(input) {
		let newIndex = focusedIndex + 1;
		if (newIndex >= elementList.length) {
			newIndex = 0;
		}

		setFocusedIndex(newIndex);
	}

	useInput((input, key) => {
		if (key.return) {
			// should be "tab" but we need something to tell the subcomponent to not respond in this case + tab is not mapped by ink
			if (key.shift) {
				// "shift" is not working
				focusPrevious();
			} else {
				focusNext();
			}
		}
	});

	return (
		<FocusContext.Provider
			value={{ register, hasFocus /*, focusNext, focusPrevious */ }}
		>
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
