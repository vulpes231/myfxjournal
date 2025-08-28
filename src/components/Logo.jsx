import React from "react";
import { logo } from "../assets";

const Logo = () => {
	return (
		<span className="flex items-center gap-2">
			<img
				src={logo}
				alt="Journo logo"
				className="w-8 h-8 md:w-10 md:h-10 object-contain"
			/>
			<h1 className="text-lg md:text-xl font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
				Journo
			</h1>
		</span>
	);
};

export default Logo;
