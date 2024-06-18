let socket: WebSocket|null

const connect = () => new Promise<{ socket: WebSocket, err: string }>(resolve => {
	const socket = new WebSocket('ws://localhost:8080')

	const onOpen = () => {
		socket.removeEventListener('open', onOpen)
		socket.removeEventListener('close', onClose)
		resolve({socket, err: 'Connected to WebSocket server'})
	}

	const onClose = () => {
		socket.removeEventListener('open', onOpen)
		socket.removeEventListener('close', onClose)
		resolve({socket, err: 'Could not connect to WebSocket server'})
	}

	socket.addEventListener('close', onClose)
	socket.addEventListener('open', onOpen)
})

chrome.runtime.onMessage.addListener((msg, _, send) => {
	switch (msg) {
		case 'connect':
			if (socket)
				return send("There's already an open connection")

			connect().then(({ socket: socket_, err }) => {
				socket = socket_
				send(err)
			})

			return true

		case 'disconnect':
			if (!socket)
				return send("There's no open connection")

			socket.addEventListener('close', () =>
				send('Connection to WebSocket server closed')
			)

			socket?.close()
			socket = null
			return true

		default:
			if (!socket)
				return send("There's no open connection")

			const foo = (event: MessageEvent<any>) => {
				send(event.data)
				socket?.removeEventListener('message', foo)
			}

			socket.addEventListener('message', foo)
			socket.send(msg)
			return true
	}
})
