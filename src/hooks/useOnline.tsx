import { useEffect, useState } from 'react'

const useOnline = () => {
	const [online, setOnline] = useState<boolean>(navigator?.onLine || true)

	const goOnline = () => setOnline(true)
	const goOffline = () => setOnline(false)

	useEffect(() => {
		window.addEventListener('online', goOnline)
		window.addEventListener('offline', goOffline)

		return () => {
			window.removeEventListener('online', goOnline)
			window.removeEventListener('offline', goOffline)
		}
	}, [])

  return {
    status: online,
    goOnline,
    goOffline
  }
}

export default useOnline
