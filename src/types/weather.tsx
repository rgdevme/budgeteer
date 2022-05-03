export interface Weather {
  current_weather: {
    temperature: number
    time: number
    weathercode: number
    winddirection: number
    windspeed: number
  }
  daily: {
    sunrise: number[]
    weathercode: number[]
    sunset: number[]
    time: number[]
    precipitation_sum: number[]
  }
  daily_units: {
    sunrise: string
		time: string
		weathercode: string
		sunset: string
		precipitation_sum: string
	}
  elevation: number
  generationtime_ms: number
	latitude: number
  longitude: number
	utc_offset_seconds: number
}
