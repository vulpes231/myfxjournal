import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	darkMode: true,
	toggle: false,
};

const navSlice = createSlice({
	name: "nav",
	initialState,
	reducers: {
		setToggle(state) {
			state.toggle = !state.toggle;
		},
		setDarkMode(state) {
			state.darkMode = !state.darkMode;
		},
	},
});

export const { setDarkMode, setToggle } = navSlice.actions;
export default navSlice.reducer;
