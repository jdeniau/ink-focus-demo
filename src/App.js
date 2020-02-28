import React, { useContext, useEffect, useReducer } from "react";
import { StdinContext, Box, Color, useInput } from "ink";
import readline from "readline";
import FocusContext from "./FocusContext";

const initialFocusState = {
	currentFocusedIndex: 0,
	elementList: []
};

var ID = function() {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return (
		"_" +
		Math.random()
			.toString(36)
			.substr(2, 9)
	);
};

function focusReducer(state, action) {
	switch (action.type) {
		case "REGISTER": {
			const elementList = state.elementList;
			// const nextFocusId = state.nextFocusId + 1;
			elementList.push(action.id);

			return {
				...state,
				// nextFocusId,
				elementList: elementList.slice(0)
			};
		}
		case "UNREGISTER": {
			return {
				...state,
				elementList: state.elementList.filter(
					element => element !== action.focusId
				)
			};
		}
		case "FOCUS_PREVIOUS": {
			let newIndex = state.currentFocusedIndex - 1;
			if (newIndex < 0) {
				newIndex = state.elementList.length - 1;
			}

			return {
				...state,
				currentFocusedIndex: newIndex
			};
		}
		case "FOCUS_NEXT": {
			let newIndex = state.currentFocusedIndex + 1;
			if (newIndex >= state.elementList.length) {
				newIndex = 0;
			}

			return {
				...state,
				currentFocusedIndex: newIndex
			};
		}
		default:
			throw new Error(
				`Unable to handle action with type ${action.type} in focusReducer`
			);
	}
}

function useFocusSelector() {
	const [state, dispatch] = useReducer(focusReducer, initialFocusState);
	const { elementList, currentFocusedIndex } = state;

	const register = () => {
		const id = ID();
		dispatch({ type: "REGISTER", id });

		return id;
	};

	function unregister(focusId) {
		dispatch({ type: "UNREGISTER", focusId });
	}

	function hasFocus(focusId) {
		return state.elementList[state.currentFocusedIndex] === focusId;
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
					dispatch({ type: "FOCUS_PREVIOUS" });
				} else {
					dispatch({ type: "FOCUS_NEXT" });
				}
			}
		};

		readline.emitKeypressEvents(stdin);
		stdin.on("keypress", handleData);

		return () => {
			stdin.off("keypress", handleData);
		};
	}, [stdin, dispatch]);

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
