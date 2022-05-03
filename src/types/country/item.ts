import ExchangeRates from '../exchangerates'
import Holiday from '../holidays'
import ResponseData from '../responses'
import Salary from '../salary'
import CountryResponse from './response'
import {
	Name,
	Capital,
	Car,
	Images,
	Currency,
	Denonyms,
	GiniIndex,
	Maps,
	PostalCode
} from './utils'

export default class CountryModel {
	altSpellings: string[]
	area: number
	borders: string // comma separated code.cc2
	code: string
	codes: {
		cca2: string
		cca3: string
		ccn3: string
		cioc: string
	}
	continents: string // comma separated cc2
	capital: Capital
	car: Car
	coat: string
	currencies: Currency[]
	demonyms: Denonyms
	elevation: number
	fifa: string
	flag?: {
		src: string
		type: 'codepoint' | 'image'
	}
	gini: GiniIndex
	idd: string
	independent: true
	landlocked: false
	languages: { [key: string]: string }
	latitude: number
	longitude: number
	maps: Maps
	name: Name & { nativeName: { [key: string]: Name } }
	population: number
	postalCode: PostalCode
	region: string
	startOfWeek: 'monday' | 'sunday'
	status: string
	subregion: string
	sunrise: number
	sunset: number
	temperature: number
	time: number
	timezones: string[]
	tld: string[]
	translations: { [key: string]: Name }
	utc_offset_seconds: number
	weathercode: number
	windspeed: number
	holidays: Holiday[]
	salaries: Salary[]

	constructor({
		data,
		exchange_rates,
		weather,
		holidays,
		salaries
	}: ResponseData) {
		this.currencies = CountryModel.#mergeCurrenciesXRates(
			data.currencies,
			exchange_rates
		)

		this.code = data.cca2
		this.codes = {
			cca2: data.cca2,
			cca3: data.cca3,
			ccn3: data.ccn3,
			cioc: data.cioc
		}

		this.capital = {
			name: data.capital[0],
			latitude: data.capitalInfo.latlng[0],
			longitude: data.capitalInfo.latlng[1]
		}

		this.weathercode = weather.current_weather.weathercode
		this.windspeed = weather.current_weather.windspeed
		this.utc_offset_seconds = weather.utc_offset_seconds
		this.sunrise = weather.daily.sunrise[0]
		this.sunset = weather.daily.sunset[0]
		this.temperature = weather.current_weather.temperature
		this.elevation = weather.elevation

		let coat = data.coatOfArms
		this.coat = !coat ? '' : coat?.svg || coat?.png

		let flag = data.flags || data.flag
		if (
			typeof flag != 'string' &&
			(flag.hasOwnProperty('svg') || flag.hasOwnProperty('png'))
		) {
			this.flag = {
				src: flag.hasOwnProperty('svg') ? flag.svg : flag.png,
				type: 'image'
			}
		} else if (typeof flag == 'string') {
			this.flag = { src: flag, type: 'codepoint' }
		}

		this.idd =
			data.idd.root +
			(data.idd.suffixes.length == 1 ? data.idd.suffixes.length : '')

		this.holidays = holidays
		this.salaries = salaries

		let datamock = { ...data }
		delete datamock.currencies
		delete datamock.capital
		delete datamock.cca2
		delete datamock.cca3
		delete datamock.ccn3
		delete datamock.cioc
		delete datamock.idd
		delete datamock.flag
		delete datamock.flags

		Object.entries(datamock).forEach(([k, v]) => {
			this[k] = v
		})
	}

	static #mergeCurrenciesXRates = (
		currencies: CountryResponse['currencies'],
		rates: ExchangeRates[]
	): Currency[] => {
		let currencykeys = Object.keys(currencies)
		return currencykeys.map(k => ({
			name: currencies[k].name,
			symbol: currencies[k].symbol,
			rate: rates.find(x => x.query.to === k).info.rate,
			ticker: k
		}))
	}

	toTableData = (
		obj: CountryModel,
		parent: string = '',
		result: Object = {}
	) => {
		let except: (keyof CountryModel)[] = ['holidays', 'salaries']
		Object.keys(obj).forEach(key => {
			let element = obj[key]
			let is_object = !!element && typeof element === 'object'
			let property = (parent || '') + key
			if (is_object && !except.includes(property as typeof except[0])) {
				console.log({
					except,
					property,
					ex: except.includes(property as typeof except[0])
				})
				this.toTableData(element, property + '.', result)
			} else result[property] = element
		})
		return result
	}
}
