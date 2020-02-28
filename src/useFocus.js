import { useState, useContext, useEffect } from "react";
import FocusContext from "./FocusContext";

export default function useFocus() {
	const focusContext = useContext(FocusContext);
	const [focusKey, setFocusKey] = useState(null);

	useEffect(() => {
		// register as a focusable element
		const generatedFocusKey = focusContext.register();
		console.log(`registered focus key ${generatedFocusKey}`);
		setFocusKey(generatedFocusKey);

		// unregister on unmount
		return () => {
			console.log(`Unregister focusKey ${generatedFocusKey}`);
			focusContext.unregister(generatedFocusKey);
		};
	}, []);

	return focusContext.hasFocus(focusKey);
}
