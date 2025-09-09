import React from "react";
import { logo } from "../assets";

const Logo = () => {
	return (
		<div className="flex items-center gap-3 cursor-pointer select-none">
			{/* Logo Image */}
			<div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-600 p-1.5 shadow-md">
				<img
					src={logo}
					alt="ChronoTrade logo"
					className="w-full h-full object-contain"
				/>
			</div>

			{/* Brand Name */}
			<h1 className="text-lg md:text-2xl font-extrabold tracking-wider uppercase text-gray-900 dark:text-white">
				<span className="text-sky-500">Chrono</span>
				<span className="text-cyan-600">Trade</span>
			</h1>
		</div>
	);
};

export default Logo;
