import { store } from './store'
import { updateState as updateIncState, increment } from './inccounterSlice'
import { updateState as updateDecState, decrement } from './deccounterSlice'


chrome.runtime.onMessage.addListener(msg => {
	switch (msg.type) {
		case 'inc': store.dispatch(increment()); break
		case 'dec': store.dispatch(decrement())
	}
})

chrome.runtime.onConnect.addListener(async port => {
	const { inccounter } = await chrome.storage.local.get('inccounter')
	store.dispatch(updateIncState(inccounter))

	const { deccounter } = await chrome.storage.local.get('deccounter')
	store.dispatch(updateDecState(deccounter))

	console.log('[onConnect]', inccounter, deccounter)

	port.onDisconnect.addListener(async () => {
		console.log('[onDisconnect]', store.getState())
		chrome.storage.local.set(store.getState())
	})
})
