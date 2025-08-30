import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../features/navSlice";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
import userReducer, { initialState } from "../features/userSlice";
import walletReducer from "../features/walletSlice";
import tradeReducer from "../features/tradeSlice";

const preloadedUser = JSON.parse(localStorage.getItem("user"));

const store = configureStore({
	reducer: {
		nav: navReducer,
		login: loginReducer,
		register: registerReducer,
		user: userReducer,
		preloadedState: {
			user: { ...initialState, user: preloadedUser },
		},
		wallet: walletReducer,
		trade: tradeReducer,
	},
});

export default store;
