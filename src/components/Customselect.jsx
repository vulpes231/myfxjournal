import React from "react";
import { styles } from "../styles";

const Customselect = ({
	handleChange,
	value,
	name,
	customClass,
	label,
	optionLabel,
	options,
}) => {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label
				htmlFor={label}
				className="block mb-1.5text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 capitalize tracking-wide"
			>
				{label}
			</label>
			<select
				className={`h-[48px] px-4 py-2 text-[16px] rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-[#1FA9D2] focus:border-[#1FA9D2] transition-all duration-200`}
				value={value}
				onChange={handleChange}
				name={name}
			>
				<option value="">{optionLabel}</option>
				{options &&
					options.length > 0 &&
					options.map((op) => {
						// console.log(op);
						return (
							<option value={op.id || op._id} key={op.id || op._id}>
								{op.name}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default Customselect;
