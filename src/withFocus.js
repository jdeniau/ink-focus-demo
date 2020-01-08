import React, { useRef } from "react";
import useFocus from "./useFocus";

function withFocus(WrappedComponent) {
	function WithFocusHOC({ forwardedRef, ...rest }) {
		const defaultRef = useRef(null); // create a default ref as it is needed by useFocus
		const ref = forwardedRef || defaultRef; // use forwarded ref if it exists, else, the default ref
		const hasFocus = useFocus(ref); // real hook that manage focus

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
