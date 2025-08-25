import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dash, Login, Profile, Register, Strategies, Trades } from "./pages";
import { Authnav, Navbar } from "./components";
import { getAccessToken } from "./constants";
import { useSelector } from "react-redux";
import { styles } from "./styles";

const App = () => {
	const token = getAccessToken();
	const { darkMode } = useSelector((state) => state.nav);
	// styles
	return (
		<>
			{!token ? <Navbar /> : <Authnav />}
			<div
				className={`${
					darkMode
						? `${styles.primary.bgColor} ${styles.primary.textColor}`
						: `bg-slate-100 ${styles.secondary.textColor}`
				}`}
			>
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
			</div>
		</>
	);
};

export default App;
