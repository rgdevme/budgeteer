import Holiday from '../holidays'
import Salary from '../salary'
import { Weather } from '../weather'
import { Codes, Name } from './utils'

export default interface CountryData {
	altSpellings: string[]
	area: number
	borders: string[]
	capital: string[]
	capitalInfo: { latlng: [number, number] }
	car: { signs: string[]; side: 'right' | 'left' }
	coatOfArms: { png: string; svg: string }
	codes: Codes
	continents: string[]
	currencies: { ticker: string; name: string; symbol: string; rate: number }[]
	demonyms: { [key: string]: { f: string; m: string } }
	fifa: string
	flag: string
	flags: { png: string; svg: string }
	gini: { [key: string]: number }
	idd: { root: string; suffixes: string[] }
	independent: true
	landlocked: false
	languages: { [key: string]: string }
	latlng: [number, number]
	maps: { googleMaps: string; openStreetMaps: string }
	name: Name & { nativeName: { [key: string]: Name } }
	population: number
	postalCode: { format: string; regex: RegExp }
	region: string
	startOfWeek: 'monday' | 'sunday'
	status: string
	subregion: string
	timezones: string[]
	tld: string[]
	translations: { [key: string]: Name }
	unMember: true
	job_salaries: Salary[]
	holidays: Holiday[]
	weather: Weather
}
