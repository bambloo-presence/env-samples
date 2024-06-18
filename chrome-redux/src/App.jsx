import { useEffect, useState } from 'react'
import { store } from './store'
import { increment } from './inccounterSlice'
import { decrement } from './deccounterSlice'

const App = () => {
	const [incvalue, setIncValue] = useState(0)
	const [decvalue, setDecValue] = useState(0)

	const inc = () => store.dispatch(increment())
	const inc_bg = () => chrome.runtime.sendMessage({ type: 'inc' })

	const dec = () => store.dispatch(decrement())
	const dec_bg = () => chrome.runtime.sendMessage({ type: 'dec' })

	useEffect(() => {
		store.subscribe(() => {
			setIncValue(store.getState().inccounter.value)
			setDecValue(store.getState().deccounter.value)
		})

		chrome.runtime.connect()
	}, [])

	return <div>
		<h1>{incvalue}</h1>

		<button onClick={inc}>Inc</button>
		<button onClick={inc_bg}>Inc background</button>

		<h1>{decvalue}</h1>

		<button onClick={dec}>Dec</button>
		<button onClick={dec_bg}>Dec background</button>
	</div>
}

export default App
