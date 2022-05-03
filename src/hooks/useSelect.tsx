import { useEffect, useState } from 'react'

const useSelect = <T,>(
	items: T[],
	initial: T[],
	key: keyof T,
	multiple: 'multiple' | 'single' = 'single'
) => {
	const [all, updateAll] = useState(items)
	const [selection, set] = useState(initial)

	const selected = (update: T) => {
		let index = selection.findIndex(item => item[key] === update[key])
		return { index, state: index >= 0 }
	}
	const verify = (item: T) => selected(item).state

	const reset = () => set(initial)
	const clear = () => set([])
	const fill = () => set(all)

	const select = (update: T) => {
		if (selected(update).state) clear()
		else set([update])
	}

	const multiselect = (update: T) => {
		let { index, state } = selected(update)
		let updated = selection
		if (state) {
			updated.splice(index, 1)
		} else {
			updated.push(update)
		}
		set([...updated])
	}

	return {
		all,
		updateAll,
		selection,
		verify,
		reset,
		clear,
		fill,
		multiselect,
		select
	}
}

export default useSelect
