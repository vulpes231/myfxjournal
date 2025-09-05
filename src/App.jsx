import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
	Dash,
	Login,
	Profile,
	Register,
	Analytics,
	Trades,
	Calculator,
	Pricing,
	Support,
} from "./pages";
import { Authnav, Footer, Navbar } from "./components";
import { getAccessToken } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "./features/userSlice";
import { getUserTrades } from "./features/tradeSlice";

const App = () => {
	const token = getAccessToken();
	const dispatch = useDispatch();
	const { darkMode } = useSelector((state) => state.nav);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	useEffect(() => {
		if (token) {
			// console.log(token);
			dispatch(getUserInfo());
			dispatch(getUserTrades());
		}
	}, [token]);

	return (
		<>
			{!token ? <Navbar /> : <Authnav />}
			<div className="bg-slate-50 dark:bg-[#000] text-gray-600 dark:text-gray-300">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Register />} />
					<Route path="/support" element={<Support />} />
					<Route path="/pricing" element={<Pricing />} />
					<Route path="/dashboard" element={token ? <Dash /> : <Login />} />
					<Route path="/profile" element={token ? <Profile /> : <Login />} />
					<Route
						path="/strategies"
						element={token ? <Analytics /> : <Login />}
					/>
					<Route path="/history" element={token ? <Trades /> : <Login />} />
					<Route path="/calculator" element={<Calculator />} />
				</Routes>
				{!token ? <Footer /> : null}
			</div>
		</>
	);
};

export default App;
