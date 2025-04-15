import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value:""
}

export const employe = createSlice({
	name : "employee",
	initialState,
	reducers : {
		addEmploye : (state, action) => {
			state.value = action.payload
		}
	}
})

export const {addEmploye} = employe.actions
export default employe.reducer
