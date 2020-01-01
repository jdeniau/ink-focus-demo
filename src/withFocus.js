import React, { useRef } from "react";
import useFocus from "./useFocus";

function withFocus(WrappedElement) {
	function WithFocusHOC(props) {
		const ref = useRef(null);
		const hasFocus = useFocus(ref);

		return <WrappedElement ref={ref} focus={hasFocus} {...props} />;
	}

	return WithFocusHOC;
}

export default withFocus;
