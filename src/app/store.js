import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../features/navSlice";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";

const store = configureStore({
	reducer: {
		nav: navReducer,
		login: loginReducer,
		register: registerReducer,
	},
});

export default store;
