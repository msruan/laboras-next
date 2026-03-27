import { type ChangeEvent, useState } from "react";

export function useInput(initialValue = "") {
	const [value, setValue] = useState(initialValue);

	const onChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
	) => {
		setValue(event.target?.value);
	};

	return {
		value,
		onChange,
	};
}
