import React, { useRef } from "react";
import useFocus from "./useFocus";

function withFocus(WrappedComponent) {
	function WithFocusHOC({ forwardedRef, ...rest }) {
		const ref = forwardedRef; // use forwarded ref if it exists
		const hasFocus = useFocus(); // real hook that manage focus

		return <WrappedComponent ref={ref} focus={hasFocus} {...rest} />;
	}

	// inject forwarded ref to WithFocusHOC and set a displayName
	function forwardRef(props, ref) {
		return <WithFocusHOC forwardedRef={ref} {...props} />;
	}
	const name = WrappedComponent.displayName || WrappedComponent.name;
	forwardRef.displayName = `withFocus(${name})`;

	return React.forwardRef(forwardRef);
}

export default withFocus;
