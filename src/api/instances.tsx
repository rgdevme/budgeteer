import axios from 'axios'

const location = axios.create({
	baseURL: 'https://ipapi.co/json/'
})

const service_provider = axios.create({
	baseURL: 'https://api.techniknews.net/ipgeo/'
})

const codes = axios.create({
	baseURL: 'https://restcountries.com/v3.1/all'
})

const country = axios.create({
	baseURL: 'https://restcountries.com/v3.1/alpha/'
})

const holidays = axios.create({
	baseURL: 'https://date.nager.at/api/v3/publicholidays/2022/'
})

const teleport = axios.create({
	baseURL: 'https://api.teleport.org/api/countries/',
	headers: {
		accept: 'application/vnd.teleport.v1+json'
	}
})

const covid = axios.create({
	baseURL: 'https://covid-api.mmediagroup.fr/v1/history'
})

const econdb = axios.create({
	baseURL: 'https://www.econdb.com/api/series/',
	params: {
		format: 'json'
	}
})

const rates = axios.create({
	baseURL:
		'https://api.exchangerate.host/convert'
})

const weather = axios.create({
	baseURL: 'https://api.open-meteo.com/v1/forecast',
	params: {
		daily: 'weathercode,sunrise,sunset,precipitation_sum',
		current_weather: 'true',
		timeformat: 'unixtime',
		timezone: 'UTC'
	}
})

const api = {
	location,
	service_provider,
	codes,
	country,
	holidays,
	teleport,
	covid,
	econdb,
	rates,
	weather
}

export default api
