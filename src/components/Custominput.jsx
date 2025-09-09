import React from "react";

const Custominput = ({
	type = "text",
	name,
	customClass = "",
	value,
	handleChange,
	placeHolder,
	label,
	helperText,
	error,
}) => {
	return (
		<div className={`flex flex-col gap-1 w-full ${customClass}`}>
			{/* Label */}
			{label && (
				<label
					htmlFor={name}
					className="block mb-1.5 text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 capitalize tracking-wide"
				>
					{label}
				</label>
			)}

			{/* Input */}
			<input
				id={name}
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeHolder}
				autoCapitalize="off"
				autoComplete="off"
				className={`w-full h-[48px] px-4 py-2 text-[16px] rounded-lg border ${
					error
						? "border-red-500 focus:border-red-500 focus:ring-red-400"
						: "border-slate-300 dark:border-slate-600 focus:border-[#1FA9D2] focus:ring-[#1FA9D2]"
				} placeholder:lowercase placeholder:text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 shadow-sm outline-none focus:ring-2 transition-all duration-200`}
			/>

			{/* Helper or Error Text */}
			{error ? (
				<p className="text-xs text-red-500 mt-1">{error}</p>
			) : helperText ? (
				<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
					{helperText}
				</p>
			) : null}
		</div>
	);
};

export default Custominput;
