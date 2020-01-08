import { useContext, useEffect } from "react";
import FocusContext from "./FocusContext";

export default function useFocus(ref) {
	const focusContext = useContext(FocusContext);

	useEffect(() => {
		// register as a focusable element
		focusContext.register(ref);

		// unregister on unmount
		return () => {
			focusContext.unregister(ref);
		};
	}, []);

	return focusContext.hasFocus(ref);
}
