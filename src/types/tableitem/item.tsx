export type PropValue = string | number | boolean | undefined

export interface TableProp<T> {
	value: T
	title?: string
	rankmethod?: 'highest' | 'middle' | 'closest' | 'lowest'
}

export const TP = <T extends PropValue>(title: string, value: T) => {
	let tp: TableProp<T> = {
		title,
		value,
		rankmethod: undefined
	}
	return tp
}
