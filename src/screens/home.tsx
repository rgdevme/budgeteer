import { useEffect, useState } from 'react'
import api from '../api/instances'
import Button from '../components/button'
import Country from '../components/country'
import useModal from '../hooks/useModal'
import useSelect from '../hooks/useSelect'
import useToggle from '../hooks/useToggle'
import CountryModel from '../types/country/model'
import CountryResponse from '../types/country/response'
import ExchangeRates from '../types/exchangerates'
import Holiday from '../types/holidays'
import ResponseData, {
	LocationResponse,
	SalariesResponse
} from '../types/responses'
import { Weather } from '../types/weather'
import { BiDollar, BiLocationPlus } from 'react-icons/bi'
import { BsHeartFill } from 'react-icons/bs'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { TiPlus } from 'react-icons/ti'
import Job from '../components/job'

const Home = () => {
	const [ready, setReady] = useState(false)
	const codes = useSelect<CountryResponse>([], [], 'cca2')
	const [currentCountry, setCurrentCountry] = useState<CountryResponse>()
	const countries = useSelect<CountryModel>([], [], 'code')
	const [countriesms, CountriesM] = useModal()

	const jobs = useSelect<CountryModel['salaries'][0]['job']>(
		[],
		[],
		'id',
		'multiple'
	)
	const [jobsms, JobsM] = useModal()
	const rate = useToggle<CountryModel['currencies'][0]>({
		ticker: 'USD',
		name: 'American Dollar',
		symbol: '$',
		rate: 1
	})

	const addCountry = async (data: CountryResponse) => {
		let country = await getCountryData(data)
		countries.multiselect(country)
	}

	const getCountryData = async (data: CountryResponse) => {
		let code = data.cca2
		let promises = [
			api.holidays.get('/' + code),
			api.weather.get('', {
				params: { latitude: data.latlng[0], longitude: data.latlng[1] }
			}),
			api.teleport.get(encodeURIComponent('iso_alpha2:') + code + '/salaries/'),
			...Object.keys(data.currencies).map(ticker =>
				api.rates.get('/', {
					params: { from: 'USD', to: ticker }
				})
			)
		]
		let results = (await Promise.all(promises)).map(r => r.data)

		let [holidays, weather, { salaries }, ...exchange_rates] = results as [
			Holiday[],
			Weather,
			SalariesResponse,
			ExchangeRates
		]

		const response: ResponseData = {
			data,
			holidays,
			weather,
			salaries,
			exchange_rates
		}

		const country = new CountryModel(response)
		return country
	}

	const getAllCountriesData = async () => {
		const current = (await api.location.get<LocationResponse>('/')).data
		const results = (await api.codes.get<CountryResponse[]>('/')).data

		const current_cm = results.find(c => c.cca2 == current.country_code)
		setCurrentCountry(current_cm)

		codes.updateAll([...results])
		setReady(true)
	}

	useEffect(() => {
		if (countries.selection.length == 0) {
			jobs.updateAll([])
		} else {
			jobs.updateAll([
				...jobs.all,
				...countries.selection
					.map(c => c.salaries.map(({ job }) => job))
					.flat()
					.filter(job => jobs.all.findIndex(({ id }) => job.id !== id) < 0)
			])
		}
	}, [countries.selection])

	useEffect(() => {
		getAllCountriesData()
	}, [])

	return (
		<div className='container' data-modal={jobsms.active || countriesms.active}>
			<div className='header'>
				<h1>Welcome to the country budgeteer!</h1>
				<p>
					With this budgeterr you can compare the main indexes of a country to
					assess whether it is a good idea to move to it or not
				</p>
			</div>
			<div className='comparison'>
				<div className='top-bar'>
					<Button
						icon
						style='text'
						disabled={!ready || jobs.all.length == 0}
						onClick={jobsms.toggle}>
						<HiOutlineClipboardCheck size={24} />
					</Button>
					<Button
						icon
						style='text'
						disabled={!ready || countries.selection.length == 0}
						onClick={rate.reset}>
						<BiDollar size={24} />
					</Button>
					<Button
						icon
						style='outline'
						disabled={!ready || countries.selection.length >= 3}
						onClick={() => addCountry(currentCountry)}>
						<BiLocationPlus size={24} />
					</Button>
					<Button
						icon
						disabled={!ready || countries.selection.length >= 3}
						onClick={countriesms.toggle}>
						<TiPlus size={24} />
					</Button>
				</div>
				<div className='table'>
					{countries.selection.length > 0 ? (
						<>
							<Country
								job_ids={jobs.selection.map(j => j.id)}
								jobs={jobs.all}
								country={new CountryModel()}
								selectJob={jobsms.toggle}
								isTitle
							/>
							{countries.selection.map(country => (
								<Country
									key={country.codes.cca2}
									remove={countries.multiselect}
									change={countriesms.toggle}
									country={country}
									selectJob={jobsms.toggle}
									job_ids={jobs.selection.map(j => j.id)}
									selectRate={rate.toggle}
									rate={rate.value}
								/>
							))}
						</>
					) : (
						<div>Add a country!</div>
					)}
				</div>
			</div>
			<footer className='footer'>
				<div>
					Made with <BsHeartFill />
				</div>
			</footer>
			<CountriesM {...countriesms}>
				{codes.all
					.sort((a, b) => a.cca2.localeCompare(b.cca2))
					.map(c => {
						return (
							<div
								key={c.cca2}
								onClick={() => {
									addCountry(c)
									countriesms.toggle()
								}}>
								{c.cca2} - {c.name.official}
							</div>
						)
					})}
			</CountriesM>
			<JobsM {...jobsms}>
				{jobs.all.map(job => (
					<Job
						key={job.id}
						job={job}
						select={() => jobs.multiselect(job)}
						selected={jobs.verify(job)}
					/>
				))}
			</JobsM>
		</div>
	)
}

export default Home
