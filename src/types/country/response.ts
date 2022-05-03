import Holiday from '../holidays'
import Salary from '../salary'

export default interface CountryResponse {
	altSpellings: string[]
	area: number
	borders: string[]
	capital: string[]
	capitalInfo: {
		latlng: [number, number]
	}
	car: {
		signs: string[]
		side: 'right' | 'left'
	}
	cca2: string
	cca3: string
	ccn3: string
	cioc: string
	coatOfArms: {
		png: string
		svg: string
	}
	continents: string[]
	currencies: {
		[key: string]: {
			name: string
			symbol: string
		}
	}
	demonyms: {
		[key: string]: {
			f: string
			m: string
		}
	}
	fifa: string
	flag: string
	flags: {
		png: string
		svg: string
	}
	gini: {
		[key: string]: number
	}
	idd: {
		root: string
		suffixes: string[]
	}
	independent: true
	landlocked: false
	languages: { [key: string]: string }
	latlng: [number, number]
	maps: {
		googleMaps: string
		openStreetMaps: string
	}
	name: {
		common: string
		nativeName: {
			[key: string]: {
				common: string
				official: string
			}
		}
		official: string
	}

	population: number
	postalCode: {
		format: string
		regex: RegExp
	}
	region: string
	startOfWeek: 'monday' | 'sunday'
	status: string
	subregion: string
	timezones: string[]
	tld: string[]
	translations: {
		[key: string]: {
			common: string
			official: string
		}
	}
	unMember: true
}
