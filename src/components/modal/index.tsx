import { FunctionComponent, PropsWithChildren } from 'react'
import Button from '../button'
import { TiTimes, TiTick } from 'react-icons/ti'
import './style.scss'

interface Modal
	extends FunctionComponent<
		PropsWithChildren<{
			active: boolean
			toggle: () => void
		}>
	> {}

const Modal: Modal = ({ active, toggle, children }) => {
	return (
		<div className={'modalcontainer ' + (active ? 'active' : '')}>
			<div className='backlayer' />
			<div className={'modal'}>
				<div className='options'>{children}</div>
				<Button name='done' icon onClick={() => toggle()}>
					<TiTick size={24} />
				</Button>
				<Button name='close' color='accent' icon onClick={() => toggle()}>
					<TiTimes size={24} />
				</Button>
			</div>
		</div>
	)
}

export default Modal
