import React from "react";
import { styles } from "../styles";

const Custominput = ({
	type,
	name,
	customClass,
	value,
	handleChange,
	placeHolder,
	label,
}) => {
	return (
		<div className="flex flex-col gap-1">
			<label
				htmlFor={name}
				className="block mb-1.5text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 capitalize tracking-wide"
			>
				{label}
			</label>

			<input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeHolder}
				autoCapitalize="off"
				autoComplete="off"
				className={`${customClass} w-full h-[48px] px-4 py-2 text-[16px] placeholder:lowercase placeholder:text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-[#1FA9D2] focus:border-[#1FA9D2] transition-all duration-200
  `}
			/>
		</div>
	);
};

export default Custominput;
