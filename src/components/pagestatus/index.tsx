import { FunctionComponent, PropsWithChildren } from 'react'
import Button from '../button'
import { IconType } from 'react-icons'

interface PageStatus
	extends FunctionComponent<
		PropsWithChildren<{
			status?: { onClick?: () => void; icon?: IconType; text?: string }
			text?: string
		}>
	> {}

const PageStatus: PageStatus = ({ status, text }) => {
	return (
		<div className='pagestatus' data-type='empty'>
			{!!status && (
				<Button
					{...{ icon: !!status.icon }}
					style='text'
					disabled={!status.onClick}
					onClick={!!status?.onClick ? status.onClick : null}>
					<status.icon size={60} />
					{!!status.text && status.text}
				</Button>
			)}
			{!!text && <div className='text'>{text}</div>}
		</div>
	)
}

export default PageStatus
