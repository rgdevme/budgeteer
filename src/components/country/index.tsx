import { FunctionComponent, useEffect, useState } from 'react'
import CountryModel from '../../types/country/model'
import ExchangeRates from '../../types/exchangerates'
import Button from '../button'
import './style.scss'
import { BiTrash } from 'react-icons/bi'
import { HiRefresh } from 'react-icons/hi'
import { metadata } from '../../types/country/metadata'

interface Country
	extends FunctionComponent<{
		country: CountryModel
		change?: (country: CountryModel) => void
		isTitle?: boolean
		job_ids?: string[]
		jobs?: CountryModel['salaries'][0]['job'][]
		rate?: CountryModel['currencies'][0]
		remove?: (country: CountryModel) => void
		selectJob?: () => void
		selectRate?: (rate: CountryModel['currencies'][0]) => void
	}> {}

const Country: Country = ({
	country,
	change = () => {},
	isTitle = false,
	job_ids = [],
	jobs = [],
	rate = {},
	remove = () => {},
	selectJob = () => {},
	selectRate = () => {}
}) => {
	const [loading, setLoading] = useState(false)

	let {
		name,
		code,
		codes,
		flag,
		capital,
		borders,
		timezones,
		area,
		population,
		gini,
		holidays,
		idd,
		currencies,
		salaries,
		temperature
	} = country

	const getTitle = (property: keyof typeof metadata) => metadata[property].title

	return (
		<div id={codes.cca2} className='country-data' data-titles={isTitle}>
			<div className='controls'>
				{!isTitle && (
					<>
						<Button
							icon
							style='text'
							onClick={() => {
								change(country)
							}}>
							<HiRefresh />
						</Button>
						<Button
							icon
							style='text'
							color='accent'
							onClick={() => remove(country)}>
							<BiTrash />
						</Button>
					</>
				)}
			</div>
			<div className='flag'>
				{isTitle ? (
					getTitle('flag')
				) : !!flag ? (
					flag.type == 'codepoint' ? (
						flag.src
					) : (
						<img src={flag.src} />
					)
				) : null}
			</div>

			<div className='name'>
				{isTitle ? getTitle('name') : name?.official ? name.official : null}
			</div>
			<div className='codes'>
				{isTitle ? (
					metadata.codes.title
				) : (
					<>
						<abbr title='Phone code'>{idd}</abbr>
						{Object.entries(codes).map(([format, value]) => (
							<abbr key={format + '-' + value} title={format}>
								{value}
							</abbr>
						))}
					</>
				)}
			</div>
			<div className='timezone'>
				{isTitle
					? getTitle('timezones')
					: timezones
							.map(tz => {
								let [h, m] = tz.replace('UTC', '').split(':')
								let tzf = [Number(h), m].join(':')
								return tzf.replace(':00', '')
							})
							.join(', ')}
			</div>
			<div className='borders'>
				{isTitle
					? getTitle('borders')
					: !!borders
					? borders.join(', ')
					: 'No borders'}
			</div>
			<div className='capital'>
				{isTitle ? getTitle('capital') : capital?.name || ''}
			</div>

			<div className='currencies'>
				{isTitle ? (
					getTitle('currencies')
				) : !currencies.length ? (
					<div>We couldn't find currency data for this country</div>
				) : (
					currencies
						.filter((r, i) => i == 0 || r.ticker.toLowerCase() != 'usd')
						.map(r => {
							return (
								<div className='currency' key={r.name}>
									<abbr title={r.name} className='symbol'>
										{r.symbol}
									</abbr>
								</div>
							)
						})
				)}
			</div>
			<div className='exchangerates'>
				{isTitle ? (
					'$1 equals'
				) : !currencies.length ? (
					<div> - </div>
				) : (
					currencies
						.filter((r, i) => i == 0 || r.ticker.toLowerCase() != 'usd')
						.map(r => {
							return (
								<div
									className='rate'
									key={r.ticker}
									onClick={() => selectRate(r)}>
									{USD(1 / r.rate)}
								</div>
							)
						})
				)}
			</div>
			<div className='area' data-stat={!isTitle}>
				{isTitle ? getTitle('area') : areaF(area)}
			</div>
			<div className='population' data-stat={!isTitle}>
				{isTitle ? getTitle('population') : number(population)}
			</div>
			<div className='density' data-stat={!isTitle}>
				{isTitle
					? 'Population density'
					: Math.round(population / area) + 'p/Km²'}
			</div>
			<div className='temperature' data-stat={!isTitle}>
				{isTitle ? getTitle('temperature') : temp(temperature)}
			</div>
			<div className='holidays' data-stat={!isTitle}>
				{isTitle ? getTitle('holidays') : holidays.length}
			</div>
			<div className='gini' data-stat={!isTitle}>
				{isTitle ? (
					<a href='https://www.google.com/search?q=gini+index'>
						{getTitle('gini')}
					</a>
				) : !!gini ? (
					<>
						{Object.entries(gini)
							.sort(([year_a], [year_b]) => Number(year_a) - Number(year_b))
							.filter((_, i) => i == 0)
							.map(([year, value]) =>
								year == 'value' ? (
									' - '
								) : (
									<span key={year + '-' + value}>
										{' '}
										{value} ({year})
									</span>
								)
							)}
					</>
				) : (
					<div>No gini idexes found</div>
				)}
			</div>
			<div className='percentiles' data-stat={!isTitle}>
				{isTitle ? (
					'Percentiles'
				) : (
					// ) : job_ids.length == 0 ? (
					// 	<div className='button warning' onClick={e => selectJob()}>
					// 		Select a job
					// 	</div>
					<>
						<div>25%</div>
						<div>50%</div>
						<div>75%</div>
					</>
				)}
			</div>
			<div
				className='jobs'
				data-stat={!isTitle}
				data-button={job_ids.length == 0}>
				{job_ids.length == 0 ? (
					isTitle ? (
						<Button name='salary' onClick={() => selectJob()}>
							Select a job
						</Button>
					) : (
						<div className='salary'>
							<div> - </div>
							<div> - </div>
							<div> - </div>
						</div>
					)
				) : isTitle ? (
					jobs
						.filter(j => job_ids.includes(j.id))
						.map(({ id, title }) => (
							<div key={'title-' + id} className='salary'>
								{title}
							</div>
						))
				) : (
					salaries
						.filter(s => job_ids.includes(s.job.id))
						.map(({ job, salary_percentiles }) => (
							<div key={job.id} className='salary'>
								<div className='pc pc25'>
									{currency(
										rate.rate * salary_percentiles.percentile_25,
										rate.ticker
									)}
								</div>
								<div className='pc pc50'>
									{currency(
										rate.rate * salary_percentiles.percentile_50,
										rate.ticker
									)}
								</div>
								<div className='pc pc75'>
									{currency(
										rate.rate * salary_percentiles.percentile_75,
										rate.ticker
									)}
								</div>
							</div>
						))
				)}
			</div>
		</div>
	)
}

const number = (number: number) =>
	new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2
	}).format(number)

const USD = (number: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 2
	}).format(number)

const currency = (number: number, ticker: string) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: ticker,
		maximumFractionDigits: 2
	}).format(number)

const temp = (number: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'unit',
		unit: 'celsius',
		maximumFractionDigits: 2
	}).format(number)

const areaF = (number: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'unit',
		unit: 'hectare',
		maximumFractionDigits: 2
	}).format(number)

export default Country
