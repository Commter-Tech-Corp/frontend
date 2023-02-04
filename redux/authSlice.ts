import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
	token: string | null;
	user: User | null;
}

// Define the initial state using that type
const initialState: AuthState = {
	token: null,
	user: null,
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
})

export const {
	setToken,
	setUser,
} = counterSlice.actions;

export default counterSlice.reducer;