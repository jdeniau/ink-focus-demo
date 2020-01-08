import React from "react";

const FocusContext = React.createContext({
	register: () => {},
	unregister: () => {},
	hasFocus: ref => {}
});

export default FocusContext;
