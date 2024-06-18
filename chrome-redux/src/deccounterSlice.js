import { createSlice } from '@reduxjs/toolkit'


function update_global(state) {
	const data = JSON.parse(JSON.stringify(state))
	console.log('[update_global]', data)
	chrome.runtime.sendMessage({ type: 'deccounter update', data })
}

const initialState = {
	value: 0
}

const DecCounterSlice = createSlice({
	name: 'deccounter',
	initialState,
	reducers: {
		setState: (_, action) => action.payload,

		updateState: (_, action) => {
			update_global(action.payload)
			return action.payload
		},

		decrement: state => {
			state.value--
			update_global(state)
		}
	}
})

export const { setState, updateState, decrement } = DecCounterSlice.actions
export default DecCounterSlice
