import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Cancela o timeout se o valor mudar (também ao mudar o atraso ou desmontar)
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]); // Re-executa o efeito se value ou delay mudarem

	return debouncedValue;
}
