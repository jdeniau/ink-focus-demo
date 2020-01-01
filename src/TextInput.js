import React, { useRef } from "react";
import TextInputWithoutFocus from "ink-text-input";
import useFocus from "./useFocus";
import withFocus from "./withFocus";

// function TextInput(props) {
// 	// Code that should be used in "inputable" libraries
// 	const ref = useRef(null);
// 	const hasFocus = useFocus(ref);
//
// 	return <TextInputWithoutFocus ref={ref} focus={hasFocus} {...props} />;
// }

// export default TextInput;
export default withFocus(TextInputWithoutFocus);
