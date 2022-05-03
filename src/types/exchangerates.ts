type ExchangeRates = {
	motd: {
		msg: string
		url: string
	}
	success: boolean
	query: {
		from: string
		to: string
		amount: number
	}
	info: {
		rate: number
	}
	historical: false
	date: string
	result: number
}
export default ExchangeRates
