import React, { useState } from "react";
import { render, Box } from "ink";
import TextInput from "./TextInput";
import TextInputHook from "./TextInputHook";
import App from "./App";

function SearchQuery() {
	const [name, setName] = useState("");
	const [quest, setQuest] = useState("");
	const [favoriteColor, setFavoriteColor] = useState("");
	const [extraInputValues, setExtraInputValues] = useState({});
	const [nbInput, setNbInput] = useState("0");

	return (
		<App>
			<Box flexDirection="column">
				<Box> </Box>
				<Box>=============================</Box>
				<Box>
					<Box marginRight={1}>Number of extra inputs ?</Box>
					<TextInput value={nbInput} onChange={setNbInput} />
				</Box>
				<Box>=============================</Box>
				<Box>
					<Box marginRight={1}>What's your name ?</Box>

					<TextInput value={name} onChange={setName} />
				</Box>

				<Box>
					<Box marginRight={1}>What is your quest ?</Box>
					<TextInputHook value={quest} onChange={setQuest} />
				</Box>

				<Box>
					<Box marginRight={1}>What is your favorite color ?</Box>
					<TextInput value={favoriteColor} onChange={setFavoriteColor} />
				</Box>

				{Array(Math.max(parseInt(nbInput, 10), 0) || 0)
					.fill(null)
					.map((_v, index) => (
						<Box key={index}>
							<Box marginRight={1}>What is your favorite color ?</Box>
							<TextInput
								value={extraInputValues[index] || ""}
								onChange={v => {
									setExtraInputValues(prev => ({ ...prev, [index]: v }));
								}}
							/>
						</Box>
					))}
			</Box>
		</App>
	);
}

render(<SearchQuery />, { debug: process.argv[2] === "--debug" });
