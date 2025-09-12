import React, { useEffect, useState } from "react";
import Recentactivity from "../components/Recentactivity";
import { formatNumber, getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
	getTradeAnalytics,
	selectAnalyticSlice,
} from "../features/analyticSlice";
import Trademodal from "../components/Trademodal";

const Trades = () => {
	const token = getAccessToken();
	const dispatch = useDispatch();
	const [totalPL, setTotalPL] = useState(0);
	const [showModal, setshowModal] = useState(false);

	const { tradeAnalytics } = useSelector(selectAnalyticSlice);

	useEffect(() => {
		document.title = "ChronoTrade - Trade History";
	}, []);

	useEffect(() => {
		if (token) {
			dispatch(getTradeAnalytics());
		}
	}, [token]);
	useEffect(() => {
		if (tradeAnalytics) {
			const total =
				parseFloat(tradeAnalytics.totalProfit) +
				parseFloat(tradeAnalytics.totalLoss);
			setTotalPL(total);
		}
	}, [tradeAnalytics]);

	const closeModal = () => {
		setshowModal(false);
	};

	return (
		<section className="p-6 w-full min-h-screen pt-28 md:pt-32 bg-gray-50 dark:bg-slate-950">
			<div className="w-full max-w-5xl mx-auto">
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
						<button
							className="px-5 py-2.5 md:px-6 md:py-3 capitalize rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 transition-all"
							onClick={() => setshowModal(true)}
						>
							Enter Trade
						</button>
						{/* <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
							Export CSV
						</button> */}
					</div>
				</div>

				{/* (Optional) Stats row */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow text-center">
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Total Trades
						</p>
						<p className="text-xl font-bold text-gray-800 dark:text-gray-100">
							{tradeAnalytics?.totalTrades || 0}
						</p>
					</div>
					<div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow text-center">
						<p className="text-sm text-gray-500 dark:text-gray-400">Winrate</p>
						<p className="text-xl font-bold text-green-500">{`${
							tradeAnalytics?.winRate || 0
						}%`}</p>
					</div>
					<div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow text-center">
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Profit / Loss
						</p>
						<p
							className={`text-xl font-bold ${
								totalPL > 0 ? "text-green-500" : "text-red-500"
							} `}
						>{`${formatNumber(totalPL, "en-US", {
							style: "currency",
							currency: "USD",
						})}`}</p>
					</div>
				</div>

				{/* Table */}
				<Recentactivity tableTitle={"Trades"} showFooter={true} />
				<Trademodal showModal={showModal} closeModal={closeModal} />
			</div>
		</section>
	);
};

export default Trades;
