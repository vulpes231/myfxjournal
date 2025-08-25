import React from "react";
import { MdCheckCircle } from "react-icons/md";

const Successmodal = ({ successText, darkMode }) => {
	return (
		<div
			className={`${
				!darkMode ? "bg-white shadow-sm" : "bg-black border border-slate-700"
			} fixed top-[80px] right-[10px] z-30 w-[280px] flex flex-col gap-2 items-center justify-center text-green-500 p-6 rounded-[5px]`}
		>
			<div className="flex items-center gap-1">
				<MdCheckCircle />
				<h3 className="font-bold text-[14px]">Success</h3>
			</div>
			<h6 className="text-[13px]">{successText}</h6>
		</div>
	);
};

export default Successmodal;
