import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../features/navSlice";
import loginReducer from "../features/loginSlice";

const store = configureStore({
	reducer: {
		nav: navReducer,
		login: loginReducer,
	},
});

export default store;
