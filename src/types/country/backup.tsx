export default class CountryModel {
	'name.official' = TP<string>('Name Official', '')
	'name.native' = TP<string>('Name Native', '')
	'name.common' = TP<string>('Name Common', '')
	languages = TP<string>('Languages', '')

	'code.cca2' = TP<string>('2 Digit Alpha Code', '')
	'code.cca3' = TP<string>('3 Digit Alpha Code', '')
	'code.ccn3' = TP<string>('CCN3', '')
	'code.cioc' = TP<string>('CIOC', '')
	fifa = TP<string>('Fifa Code', '')
	idd = TP<string>('Phone code', '')

	region = TP<string>('Region', '')
	subregion = TP<string>('Sub region', '')
	timezones = TP<string>('UTC', '0')
	borders = TP<string>('Borders', '')
	borders_count = TP<number>('Borders count', 0)
	maps = TP<string>('Maps', '')

	coat = TP<string>('Coat of arms', '')
	flag = TP<string>('Flag', '')

	status = TP<string>('Status', '')
	startOfWeek = TP<string>('Week starts on', 'Monday')
	car = TP<string>('Carside', 'left')
	tld = TP<string>('TLD', '')

	'capital.name' = TP<string>('Capital', '')
	'capital.latitude' = TP<number>('Longitude', 0)
	'capital.longitude' = TP<number>('Latitude', 0)

	'gini.year' = TP<number>('Sourced on', 0)
	'gini.index' = TP<number>('GINI index', 0)

	area = TP<number>('Area', 0)
	elevation = TP<number>('Elevation', 0)
	latitude = TP<number>('Latitude', 0)
	longitude = TP<number>('Longitude', 0)
	population = TP<number>('Population', 0)
	sunrise = TP<number>('Sunrise', 0)
	sunset = TP<number>('Sunset', 0)
	temperature = TP<number>('Temperature', 0)
	time = TP<number>('Time', 0)
	weathercode = TP<number>('Weathercode', 0)
	windspeed = TP<number>('Windspeed', 0)

	independent = TP<boolean>('', false)
	landlocked = TP<boolean>('', false)

	currencies: Currency[] = []
	salaries: Salary[] = []
	holidays: Holiday[] = []
	'holidays.count' = TP<number>('Holidays count', 0)
	// translations: { [key: string]: Name } = {}
	// demonyms: Denonyms

	constructor({
		data,
		exchange_rates,
		weather,
		holidays,
		salaries
	}: ResponseData) {
		let langkeys = Object.keys(data.languages)

		langkeys.forEach(l => {
			if (this['name.native'].value == '') {
				this['name.native'].value = data.name.nativeName[l].common
			}
		})
		this['name.official'].value = data.name.official
		this['name.common'].value = data.name.common
		this.languages.value = langkeys.map(l => data.languages[l]).join(', ')

		this['code.cca2'].value = data.cca2
		this['code.cca3'].value = data.cca3
		this['code.ccn3'].value = data.ccn3
		this['code.cioc'].value = data.cioc
		this['fifa'].value = data.fifa
		this['idd'].value =
			data.idd.root +
			(data.idd.suffixes.length == 1 ? data.idd.suffixes.length : '')

		this['region'].value = data.region
		this['subregion'].value = data.subregion
		this['timezones'].value = data.timezones.join(', ')
		this['borders'].value = data.borders.join(', ')
		this['borders_count'].value = data.borders.length
		this['maps'].value = data.maps.googleMaps || ''

		this['status'].value = data.status
		this['startOfWeek'].value = data.startOfWeek
		this['car'].value = data.car.side
		this['tld'].value = data.tld.join(',')

		this['capital.name'].value = data.capital.join(', ')
		this['capital.latitude'].value = data.capitalInfo.latlng[0]
		this['capital.longitude'].value = data.capitalInfo.latlng[1]

		this['coat'].value = data.coatOfArms?.png
		this['flag'].value = data.flags?.svg
			? data.flags.svg
			: data.flags?.png
			? data.flags.png
			: data.flag

		let ginikeys = Object.keys(data.gini).map(y => Number(y))
		let giniyear = Math.max(...ginikeys)
		this['gini.year'].value = giniyear
		this['gini.index'].value = data.gini[giniyear]

		this.temperature.value = weather.current_weather.temperature
		this.temperature.rankmethod = 'middle'

		this.area.value = data.area
		this.population.value = data.population
		this.elevation.value = weather.elevation
		this.latitude.value = weather.latitude
		this.longitude.value = weather.longitude
		this.sunrise.value = weather.daily.sunrise[0]
		this.sunset.value = weather.daily.sunset[0]
		this.weathercode.value = weather.current_weather.weathercode
		this.windspeed.value = weather.current_weather.windspeed
		this.elevation.value = weather.elevation

		this.landlocked.value = data.landlocked
		this.independent.value = data.independent

		this['holidays.count'].value = holidays.length
		this.holidays = holidays
		this.salaries = salaries

		let currencykeys = Object.keys(data.currencies)
		this.currencies = currencykeys.map(k => ({
			name: data.currencies[k].name,
			symbol: data.currencies[k].symbol,
			rate: exchange_rates.find(x => x.query.to === k).info.rate,
			ticker: k
		}))
	}
}
