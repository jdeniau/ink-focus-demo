import React, { useState } from "react";
import { render, Box } from "ink";
import TextInput from "./TextInput";
import App from "./App";

function SearchQuery() {
	const [name, setName] = useState("");
	const [quest, setQuest] = useState("");
	const [favoriteColor, setFavoriteColor] = useState("");

	return (
		<App>
			<Box flexDirection="column">
				<Box> </Box>
				<Box>=============================</Box>
				<Box>
					<Box marginRight={1}>What's your name ?</Box>

					<TextInput value={name} onChange={setName} />
				</Box>

				<Box>
					<Box marginRight={1}>What is your quest ?</Box>
					<TextInput value={quest} onChange={setQuest} />
				</Box>

				<Box>
					<Box marginRight={1}>What is your favorite color ?</Box>
					<TextInput value={favoriteColor} onChange={setFavoriteColor} />
				</Box>
			</Box>
		</App>
	);
}

render(<SearchQuery />, { debug: false });
