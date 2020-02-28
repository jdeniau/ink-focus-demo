import React, { useRef } from "react";
import TextInputWithoutFocus from "ink-text-input";
import useFocus from "./useFocus";

export default function TextInputHook(props) {
	const hasFocus = useFocus();

	return <TextInputWithoutFocus focus={hasFocus} {...props} />;
}
