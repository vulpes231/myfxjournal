import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../features/navSlice";
import loginReducer from "../features/loginSlice";
import registerReducer from "../features/registerSlice";
import userReducer from "../features/userSlice";
import walletReducer from "../features/walletSlice";

const store = configureStore({
	reducer: {
		nav: navReducer,
		login: loginReducer,
		register: registerReducer,
		user: userReducer,
		wallet: walletReducer,
	},
});

export default store;
