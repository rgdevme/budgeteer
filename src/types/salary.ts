import { Job } from './country/utils'

export default interface Salary {
	job: Job
	salary_percentiles: {
		percentile_25: number
		percentile_50: number
		percentile_75: number
	}
}
