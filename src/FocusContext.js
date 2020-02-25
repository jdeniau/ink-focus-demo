import React from "react";

const FocusContext = React.createContext({
	register: () => 1,
	unregister: () => {},
	hasFocus: ref => false
});

export default FocusContext;
