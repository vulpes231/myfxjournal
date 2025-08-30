import React from "react";

const Infocard = ({ title, sub }) => {
	return (
		<span className="bg-slate-200 rounded-md text-black flex flex-col items-center capitalize p-4 w-full justify-between">
			<h3 className="font-bold whitespace-nowrap">{title}</h3>
			<p>{sub}</p>
		</span>
	);
};

export default Infocard;
