export interface Capital {
	name: string
	latitude: number
	longitude: number
}
export interface Currency {
	ticker: string
	name: string
	symbol: string
	rate: number
}

export interface GiniIndex {
	year: number
	value: number
}
export interface Codes {
	cca2: string
	cca3: string
	ccn3: string
	cioc: string
}

export interface Name {
	common: string
	official: string
}

export interface Images {
	png: string
	svg: string
}
export interface Denonyms {
	[key: string]: {
		f: string
		m: string
	}
}

export interface Car {
	signs: string[]
	side: 'right' | 'left'
}

export interface Maps {
	googleMaps: string
	openStreetMaps: string
}

export interface PostalCode {
	format: string
	regex: RegExp
}

export interface Job {
	id: string
	title: string
}
