import { useContext, useEffect } from "react";
import FocusContext from "./FocusContext";

export default function useFocus(ref) {
	const focusContext = useContext(FocusContext);

	useEffect(() => {
		// register as focusable element
		focusContext.register(ref);
	}, []);

	return focusContext.hasFocus(ref);
}
