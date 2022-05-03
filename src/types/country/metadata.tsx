import { TableProp } from '../tableitem/item'
import CountryModel from './item'

export const metadata: Partial<
	Record<
		keyof CountryModel,
		{
			rankmethod?: TableProp<any>['rankmethod']
			title: TableProp<any>['title']
		}
	>
> = {
	altSpellings: { title: 'Other spellings' },
	area: { title: 'Area' },
	borders: { title: 'Borders' },
	capital: { title: 'Capital' },
	car: { title: 'Car side' },
	coat: { title: 'Coat of arms' },
	codes: { title: 'Codes' },
	continents: { title: 'Continent' },
	currencies: { title: 'Currencies' },
	fifa: { title: 'FIFA Code' },
	flag: { title: 'Flag' },
	elevation: { title: 'Elevation' },
	gini: { title: 'GINI index' },
	holidays: { title: 'Holidays' },
	idd: { title: 'Phone code' },
	latitude: { title: 'Latitude' },
	longitude: { title: 'Longitude' },
	maps: { title: 'Google Maps' },
	languages: { title: 'Spoken languages' },
	name: { title: 'Name' },
	population: { title: 'Population' },
	postalCode: { title: 'Postal Code' },
	region: { title: 'Region' },
	salaries: { title: 'Salaries' },
	startOfWeek: { title: 'Week starts on' },
	status: { title: 'Status' },
	subregion: { title: 'Subregion' },
	sunrise: { title: 'Sunrise' },
	sunset: { title: 'Sunset' },
	temperature: { title: 'Temperature' },
	timezones: { title: 'Timezones' },
	tld: { title: 'TLD' },
	weathercode: { title: 'Weathercode' },
	windspeed: { title: 'Windspeed' }
}
