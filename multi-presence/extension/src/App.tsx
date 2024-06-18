function App() {
	const handle_call = () => chrome.runtime.sendMessage('')
	const handle_exit = () => chrome.runtime.sendMessage('exit')
	const handle_hi = () => chrome.runtime.sendMessage('hi')

	return (
		<>
			<button onClick={handle_call}>
				Call service worker
			</button>

			<button onClick={handle_exit}>
				Exit port
			</button>

			<button onClick={handle_hi}>
				Wave 'em all
			</button>
		</>
	)
}

export default App
