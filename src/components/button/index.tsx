import { FunctionComponent, PropsWithChildren } from 'react'
import './style.scss'

interface Button
	extends FunctionComponent<
		PropsWithChildren<{
			color?: 'main' | 'accent'
			disabled?: boolean
			icon?: boolean
			name?: string
			onClick: () => void
			style?: 'flat' | 'outline' | 'text'
		}>
	> {}

const Button: Button = ({
	children,
	color = 'main',
	disabled = false,
	icon = false,
	name = '',
	onClick,
	style = 'flat'
}) => {
	return (
		<div
			className={`button ${style} ${color} ${name}`}
			data-disabled={disabled}
			data-icon={icon}
			onClick={() => !disabled && onClick()}>
			{children}
		</div>
	)
}

export default Button
