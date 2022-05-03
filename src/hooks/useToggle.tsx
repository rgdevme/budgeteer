import { useEffect, useState } from 'react'

const useToggle = <T,>(initial: T) => {
	const [value, set] = useState(initial)

	const reset = () => set(initial)
	const toggle = (update: T) => {
		let string_a = JSON.stringify(value)
		let string_b = JSON.stringify(update)

		if (string_a == string_b) set(initial)
		else set(update)
	}

	return { value, set, reset, toggle }
}

export default useToggle
