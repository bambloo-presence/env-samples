import { configureStore } from '@reduxjs/toolkit'
import IncCounterSlice, { setState as setIncState } from './inccounterSlice'
import DecCounterSlice, { setState as setDecState } from './deccounterSlice'

export const store = configureStore({
	reducer: {
		inccounter: IncCounterSlice.reducer,
		deccounter: DecCounterSlice.reducer
	}
})

chrome.runtime.onMessage.addListener(msg => {
	switch (msg.type) {
		case 'inccounter update':
			console.log('[inccounter update]', msg.data)
			store.dispatch(setIncState(msg.data))
			break

		case 'deccounter update':
			console.log('[deccounter update]', msg.data)
			store.dispatch(setDecState(msg.data))
	}
})
