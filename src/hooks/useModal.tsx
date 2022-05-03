import { useState } from 'react'
import Modal from '../components/modal'

const useModal = (initial: boolean = false) => {
	const [active, set] = useState(initial)
	const toggle = () => set(prev => !prev)

	return [{ active, toggle }, Modal] as [
		{ active: boolean; toggle: () => void },
		Modal
	]
}

export default useModal
