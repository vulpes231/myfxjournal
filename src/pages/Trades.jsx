import React, { useEffect } from "react";
import Recentactivity from "../components/Recentactivity";

const Trades = () => {
	useEffect(() => {
		document.title = "Journo - Trade History";
	}, []);

	return (
		<section className="p-6 w-full min-h-screen pt-28 md:pt-32 bg-gray-50 dark:bg-slate-950">
			<div className="w-full md:max-w-[750px] lg:max-w-[1100px] md:mx-auto">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
					<div>
						<h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
							Trade History
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
							Review, filter, and analyze your past trades
						</p>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-3 mt-4 md:mt-0">
						<input
							type="text"
							placeholder="Search trades..."
							className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
						/>
						<button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
							Export CSV
						</button>
					</div>
				</div>

				{/* (Optional) Stats row */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow text-center">
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Total Trades
						</p>
						<p className="text-xl font-bold text-gray-800 dark:text-gray-100">
							0
						</p>
					</div>
					<div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow text-center">
						<p className="text-sm text-gray-500 dark:text-gray-400">Winrate</p>
						<p className="text-xl font-bold text-green-500">0%</p>
					</div>
					<div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow text-center">
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Profit / Loss
						</p>
						<p className="text-xl font-bold text-red-500">$0.00</p>
					</div>
				</div>

				{/* Table */}
				<Recentactivity tableTitle={"Trades"} showFooter={true} />
			</div>
		</section>
	);
};

export default Trades;
