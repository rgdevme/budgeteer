import { FunctionComponent } from 'react'
import { TiTick } from 'react-icons/ti'
import CountryModel from '../../types/country/model'
import './style.scss'

interface Job
	extends FunctionComponent<{
		job: CountryModel['salaries'][0]['job']
		selected: boolean
		select: (job: CountryModel['salaries'][0]['job']) => void
	}> {}

const Job: Job = ({ job, select, selected }) => {
	return (
		<div key={job.id} className='job' onClick={() => select(job)}>
			{selected && <TiTick size={24} />}
			<span className='job-name'>{job.title}</span>
			{selected && <TiTick size={24} />}
		</div>
	)
}

export default Job
