import React from "react";

const Customselect = ({
	handleChange,
	value,
	name,
	customClass = "",
	label,
	optionLabel = "Select an option",
	options = [],
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

			{/* Select */}
			<select
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
				className={`h-[48px] px-4 py-2 text-[15px] rounded-lg border ${
					error
						? "border-red-500 focus:border-red-500 focus:ring-red-400"
						: "border-slate-300 dark:border-slate-600 focus:border-[#1FA9D2] focus:ring-[#1FA9D2]"
				} bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 shadow-sm outline-none focus:ring-2 transition-all duration-200 appearance-none`}
			>
				<option value="" disabled>
					{optionLabel}
				</option>
				{options && options.length > 0 ? (
					options.map((op) => (
						<option value={op.id || op._id} key={op.id || op._id}>
							{op.name}
						</option>
					))
				) : (
					<option disabled>No options available</option>
				)}
			</select>

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

export default Customselect;
