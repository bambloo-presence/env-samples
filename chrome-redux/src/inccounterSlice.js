import { createSlice } from '@reduxjs/toolkit'


function update_global(state) {
	const data = JSON.parse(JSON.stringify(state))
	console.log('[update_global]', data)
	chrome.runtime.sendMessage({ type: 'inccounter update', data })
}

const initialState = {
	value: 0
}

const IncCounterSlice = createSlice({
	name: 'inccounter',
	initialState,
	reducers: {
		setState: (_, action) => action.payload,

		updateState: (_, action) => {
			update_global(action.payload)
			return action.payload
		},

		increment: state => {
			state.value++
			update_global(state)
		}
	}
})

export const { setState, updateState, increment } = IncCounterSlice.actions
export default IncCounterSlice
