import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../features/navSlice";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
import userReducer, { initialState } from "../features/userSlice";
import walletReducer from "../features/walletSlice";
import tradeReducer from "../features/tradeSlice";
import assetReducer from "../features/assetSlice";
import analyticReducer from "../features/analyticSlice";

const preloadedUser = JSON.parse(localStorage.getItem("user"));

const store = configureStore({
	reducer: {
		nav: navReducer,
		login: loginReducer,
		register: registerReducer,
		user: userReducer,
		wallet: walletReducer,
		trade: tradeReducer,
		assets: assetReducer,
		analytics: analyticReducer,
	},
	preloadedState: {
		user: { ...initialState, user: preloadedUser },
	},
});

export default store;
