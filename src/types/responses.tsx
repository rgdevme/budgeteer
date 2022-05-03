import CountryResponse from './country/response'
import ExchangeRates from './exchangerates'
import Holiday from './holidays'
import Salary from './salary'
import { Weather } from './weather'

export default interface ResponseData {
	data: CountryResponse
	holidays: Holiday[]
	salaries: Salary[],
	weather: Weather
	exchange_rates: ExchangeRates[]
}

export type SalariesResponse = {
	_links: {
		curies: {
			href: string
			name: string
			templated: boolean
		}[]
		self: {
			href: string
		}
	}
	salaries: Salary[]
}

export type LocationResponse = {
	ip: string
	version: string
	city: string
	region: string
	region_code: string
	country: string
	country_name: string
	country_code: string
	country_code_iso3: string
	country_capital: string
	country_tld: string | null
	continent_code: string
	in_eu: boolean
	postal: string | null
	latitude: number
	longitude: number
	timezone: string
	utc_offset: string
	country_calling_code: string
	currency: string
	currency_name: string
	languages: string
	country_area: number
	country_population: number
	asn: string
	org: string
}
