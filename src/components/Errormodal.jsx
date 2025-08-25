import React from "react";
import { MdError } from "react-icons/md";

const Errormodal = ({ error, darkMode }) => {
	return (
		<div
			className={`${
				!darkMode ? "bg-white shadow-sm" : "bg-black border border-slate-700"
			} fixed top-[80px] right-[10px] z-30 w-[280px] flex flex-col gap-2 items-center justify-center text-red-500 p-6 rounded-[5px]`}
		>
			<div className="flex items-center gap-1">
				<MdError />
				<h3 className="font-bold text-[14px]">Error</h3>
			</div>
			<h6 className="text-[13px]">{error}</h6>
		</div>
	);
};

export default Errormodal;
