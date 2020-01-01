import React, {
	useMemo,
	useCallback,
	useContext,
	useRef,
	useState,
	useEffect
} from "react";
import { useInput, render, Box, Color, StdinContext } from "ink";
import TextInputWithoutFocus from "ink-text-input";

const FocusContext = React.createContext({});

// an easy hook to get current state
function useFocus(ref) {
	const focusContext = useContext(FocusContext);

	useEffect(() => {
		// register as focusable element
		focusContext.register(ref);
	}, []);

	return focusContext.hasFocus(ref);
}

function TextInput(props) {
	// Code that should be used in "inputable" libraries
	const ref = useRef(null);
	const hasFocus = useFocus(ref);

	return <TextInputWithoutFocus ref={ref} focus={hasFocus} {...props} />;
}

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

function SearchQuery() {
	const [name, setName] = useState("");
	const [quest, setQuest] = useState("");
	const [favoriteColor, setFavoriteColor] = useState("");

	return (
		<App>
			<Box flexDirection="column">
				<Box> </Box>
				<Box>=============================</Box>
				<Box>
					<Box marginRight={1}>What's your name ?</Box>

					<TextInput value={name} onChange={setName} />
				</Box>

				<Box>
					<Box marginRight={1}>What is your quest ?</Box>
					<TextInput value={quest} onChange={setQuest} />
				</Box>

				<Box>
					<Box marginRight={1}>What is your favorite color ?</Box>
					<TextInput
						value={favoriteColor}
						onChange={setFavoriteColor}
					/>
				</Box>
			</Box>
		</App>
	);
}

render(<SearchQuery />, { debug: false });
