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
				className="text-[14px] md:text-[16px] font-normal text-[#9f9f9f] capitalize"
				htmlFor=""
			>
				{label}
			</label>
			<input
				type={type}
				name={name}
				className={`${customClass} ${styles.secondary.border} w-full p-2 h-[40px]`}
				value={value}
				onChange={handleChange}
				placeholder={placeHolder}
				autoCapitalize="off"
				autoComplete="off"
			/>
		</div>
	);
};

export default Custominput;
