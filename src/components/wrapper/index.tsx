import React, { PropsWithChildren, ReactNode } from 'react'
import Loading from '../loading'

interface WrapperProps
	extends PropsWithChildren<{
		loading?: boolean
		ready?: {
			component: JSX.Element
			status: boolean
		}
	}> {}

const Wrapper = ({ loading = false, ready, children }: WrapperProps) => {
	return loading ? (
		<Loading />
	) : !ready?.status ? (
		ready?.component
	) : (
		<>{children}</>
	)
}

export default Wrapper
