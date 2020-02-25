import { useState, useContext, useEffect } from "react";
import FocusContext from "./FocusContext";

export default function useFocus() {
	const focusContext = useContext(FocusContext);
	const [focusKey, setFocusKey] = useState(null);

	useEffect(() => {
		// register as a focusable element
		setFocusKey(focusContext.register());

		// unregister on unmount
		return () => {
			focusContext.unregister(focusKey);
		};
	}, []);

	return focusContext.hasFocus(focusKey);
}
