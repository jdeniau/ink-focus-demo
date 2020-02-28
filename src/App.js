import React, { useContext, useEffect, useState } from "react";
import { StdinContext, Box, Color, useInput } from "ink";
import readline from "readline";
import FocusContext from "./FocusContext";

let FOCUS_ID = 0;
function nextFocusId() {
	FOCUS_ID++;

	return FOCUS_ID;
}

function useFocusSelector() {
	const [currentFocusedIndex, setCurrentFocusedIndex] = useState(0);
	const [elementList, setElementList] = useState([]);

	const register = () => {
		const focusId = nextFocusId();
		elementList.push(focusId);
		setElementList(elementList.slice(0));

		return focusId;
	};

	function unregister(focusId) {
		setElementList(prev => prev.filter(element => element !== focusId));
	}

	function hasFocus(focusId) {
		return elementList[currentFocusedIndex] === focusId;
	}

	function focusPrevious() {
		let newIndex = currentFocusedIndex - 1;
		if (newIndex < 0) {
			newIndex = elementList.length - 1;
		}
		setCurrentFocusedIndex(newIndex);
	}

	function focusNext() {
		let newIndex = currentFocusedIndex + 1;
		if (newIndex >= elementList.length) {
			newIndex = 0;
		}

		setCurrentFocusedIndex(newIndex);
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

	return { register, unregister, hasFocus, elementList, currentFocusedIndex };
}

function App({ children }) {
	const {
		register,
		unregister,
		hasFocus,
		elementList,
		currentFocusedIndex
	} = useFocusSelector();

	return (
		<FocusContext.Provider value={{ register, unregister, hasFocus }}>
			{children}

			<Color gray>
				<Box flexDirection="column">
					<Box>-----------------------------</Box>
					<Box>Debug:</Box>
					<Box>Nb focusable elements : {elementList.length}</Box>
					<Box>Focused index : {currentFocusedIndex}</Box>
				</Box>
			</Color>
		</FocusContext.Provider>
	);
}

export default App;
