import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dash, Login, Profile, Register, Strategies, Trades } from "./pages";
import { Authnav, Navbar } from "./components";
import { getAccessToken } from "./constants";

const App = () => {
	const token = getAccessToken();

	return (
		<>
			{!token ? <Navbar /> : <Authnav />}
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
		</>
	);
};

export default App;
