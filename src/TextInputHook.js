import React, { useRef } from "react";
import TextInputWithoutFocus from "ink-text-input";
import useFocus from "./useFocus";

export default function TextInputHook(props) {
	const ref = useRef(null); // might be anything, like 1234 for example
	const hasFocus = useFocus(ref);

	return <TextInputWithoutFocus ref={ref} focus={hasFocus} {...props} />;
}
