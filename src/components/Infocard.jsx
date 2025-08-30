import React from "react";

const Infocard = ({ icon, title, sub }) => {
	return (
		<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center w-full">
			{/* Icon */}
			<div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-3">
				{icon}
			</div>

			{/* Title */}
			<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
				{title}
			</h3>

			{/* Subtitle */}
			<p className="text-sm text-gray-500 dark:text-gray-400">{sub}</p>
		</div>
	);
};

export default Infocard;
