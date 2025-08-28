import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Dash, Login, Profile, Register, Strategies, Trades } from "./pages";
import { Authnav, Footer, Navbar } from "./components";
import { getAccessToken } from "./constants";
import { useSelector } from "react-redux";

const App = () => {
	const token = getAccessToken();
	const { darkMode } = useSelector((state) => state.nav);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<>
			{!token ? <Navbar /> : <Authnav />}
			<div className="bg-slate-50 dark:bg-slate-950">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Register />} />
					<Route path="/dashboard" element={token ? <Dash /> : <Login />} />
					<Route path="/profile" element={token ? <Profile /> : <Login />} />
					<Route
						path="/strategies"
						element={token ? <Strategies /> : <Login />}
					/>
					<Route path="/trades" element={token ? <Trades /> : <Login />} />
				</Routes>
				{!token ? <Footer /> : null}
			</div>
		</>
	);
};

export default App;
