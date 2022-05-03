const useID = () => {
	const getID = (id: string | number, key: string | number) =>
		id.toString() + '-' + key
	return { getID }
}

export default useID
