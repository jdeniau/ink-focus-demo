import React from "react";

const FocusContext = React.createContext({
	register: () => {},
	hasFocus: ref => {}
});

export default FocusContext;
