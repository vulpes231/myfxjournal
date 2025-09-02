import React from "react";

const Infocard = ({ icon, title, value, footer }) => {
	return (
		<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col items-center justify-between text-center w-full">
			{/* Icon */}
			<div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-3">
				{icon}
			</div>

			{/* Title */}
			<h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
				{title}
			</h3>

			{/* Main Value */}
			<p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
				{value}
			</p>

			{/* Footer (extra info) */}
			{footer && (
				<div className="mt-4 w-full border-t border-gray-200 dark:border-gray-700 pt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
					{footer.map((item, index) => (
						<div key={index} className="flex flex-col items-center w-1/2">
							<span className="font-semibold text-gray-800 dark:text-gray-200 text-[18px] md:text-[22px]">
								{item.value}
							</span>
							<span>{item.label}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Infocard;
