import { metadata } from '../../types/country/metadata'

const CountryTitles = () => {
	return (
		<div className='data'>
			{Object.entries(metadata).map(([id, { title }]) => (
				<div className={id}>{title}</div>
			))}
		</div>
	)
}

export default CountryTitles
