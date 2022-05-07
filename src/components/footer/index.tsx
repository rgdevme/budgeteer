import { BsHeartFill, BsInfoCircle } from 'react-icons/bs'
import useModal from '../../hooks/useModal'
import './style.scss'

const Footer = () => {
	const [info, InfoModal] = useModal()

	const libraries: [string, [{ name: React.ReactNode; link: string }]][] = [
		['Libraries', [{ name: 'React', link: '' }]]
	]
	return (
		<footer className='footer'>
			<div>
				Made with <BsHeartFill className='love' />{' '}
				<span className='clickable' onClick={info.toggle}>
					(and other stuff <BsInfoCircle className='info' />)
				</span>
			</div>
			<InfoModal {...info}>
				{libraries.map(([title, libs]) => (
					<div key={title} className='info-section'>
						<h3>{title}</h3>
						{libs.map(lib => (
							<a href={lib.link} key={lib.link} target='_blank'>
								{lib.name}
							</a>
						))}
					</div>
				))}
			</InfoModal>
		</footer>
	)
}

export default Footer
