let hosts: chrome.runtime.Port[] = []

function create_port() {
	const port = chrome.runtime.connectNative('com.elisoli.test.multiple_instances')

	do
		port.name = `${Math.floor(Math.random() * 100)}`
	while (hosts.find(e => e.name === port.name))

	port.onMessage.addListener((msg, port) => {
  	console.log(`Received "${msg}" form ${port.name}`)
	})

	port.onDisconnect.addListener(port => {
	  console.log('Disconnected', chrome.runtime.lastError)
		exit_port(port.name)
		console.log(`Auto excited host ${port.name}`)
	})

	port.postMessage(port.name)
	hosts.push(port)
}

function exit_port(name: string | null) {
	console.log(hosts.map(e => e.name).join(','))

	if (hosts.length === 0)
		return console.log('Hosts list is empty')

	if (name === null)
		name = hosts[Math.floor(Math.random() * hosts.length)].name

	const port = hosts.find(e => e.name === name)

	if (!port)
		return console.log(`Port ${name} not found`)

	port.disconnect()
	hosts = hosts.filter(e => e.name !== name)
}

chrome.runtime.onMessage.addListener(msg => {
	switch (msg) {
		case 'exit':
			exit_port(null)
			break

		case 'hi':
			hosts.forEach(e => e.postMessage('hi'))
			break

		default:
			create_port()
	}
})
