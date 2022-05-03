export default interface Holiday {
	counties: string[] | null
	countryCode: string
	date: string
	fixed: boolean
	global: boolean
	launchYear: number
	localName: string
	name: string
	types: HolidayType[]
}

type HolidayType =
	| 'Public'
	| 'Bank'
	| 'School'
	| 'Authorities'
	| 'Optional'
	| 'Observance'

