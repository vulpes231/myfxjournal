import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTradeSlice } from "../features/tradeSlice";
import { eur, gbp, gold, jpy, usa } from "../assets";
import { format } from "date-fns";
import { styles } from "../styles";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import UpdateTrade from "./UpdateTrade";
import Closetrade from "./Closetrade";

const Recentactivity = ({ tableTitle, showFooter, count }) => {
	const { userTrades, tradesPagination } = useSelector(selectTradeSlice);
	const [page, setPage] = useState(tradesPagination?.currentPage || 1);
	const [tradeData, setTradeData] = useState(null);

	const [action, setAction] = useState("");

	const handleAction = (e, trade) => {
		setAction(e.target.value);
		// console.log(trade);
		setTradeData(trade);
	};

	const closeModal = () => {
		setAction("");
		setTradeData(null);
	};

	const handlePrev = () => {
		if (page > 1) setPage((p) => p - 1);
	};
	const handleNext = () => {
		if (page < tradesPagination?.totalPages) setPage((p) => p + 1);
	};

	const docCount = count > 0 ? count : userTrades.length;

	return (
		<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-4 md:p-6">
			<div className="flex justify-between items-center py-2">
				<h3 className="text-lg md:text-2xl font-semibold capitalize mb-6">
					{tableTitle}
				</h3>

				<select className="border rounded-lg px-2 py-1 text-sm bg-white dark:bg-slate-800 dark:text-slate-200">
					<option value="">Filter By</option>
					<option value="orderType">Position</option>
					<option value="asset">Asset</option>
					<option value="status">Status</option>
				</select>
			</div>

			<hr className="border border-gray-200 dark:border-gray-700" />

			<div className="overflow-x-auto">
				{userTrades.length > 0 ? (
					<table className="w-full border-collapse text-sm md:text-base">
						<thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
							<tr>
								<th className={`${styles.table.th} font-semibold`}>
									Asset / Order
								</th>
								<th
									className={`${styles.table.th} hidden md:table-cell font-semibold`}
								>
									Risk Ratio / %
								</th>
								<th
									className={`${styles.table.th} hidden md:table-cell font-semibold`}
								>
									Entry
								</th>
								<th className={`${styles.table.th} font-semibold`}>
									SL / Amount
								</th>
								<th className={`${styles.table.th} font-semibold`}>
									TP / Amount
								</th>
								<th
									className={`${styles.table.th} hidden md:table-cell font-semibold`}
								>
									Status / Result
								</th>
								<th
									className={`${styles.table.th} hidden md:table-cell font-semibold`}
								>
									Date
								</th>
								<th className={`${styles.table.th} font-semibold`}>Action</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-slate-200 dark:divide-slate-700">
							{userTrades.slice(0, docCount).map((trade) => {
								const icon = trade.asset.includes("gbp")
									? gbp
									: trade.asset.includes("xau")
									? gold
									: trade.asset.includes("eur")
									? eur
									: trade.asset.includes("usd")
									? usa
									: trade.asset.includes("btc")
									? btc
									: null;
								return (
									<tr
										key={trade._id}
										className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
									>
										{/* asset */}
										<td className={styles.table.td}>
											<div className="flex flex-col gap-1">
												<span className="flex items-center gap-2">
													{icon && (
														<img
															src={icon}
															alt=""
															className="w-5 h-5 rounded-full"
														/>
													)}
													<span className="font-medium uppercase">
														{trade.asset}
													</span>
												</span>
												<small className="flex items-center font-normal gap-2 text-[11px] text-slate-500">
													{trade.orderType === "buy" ? (
														<TrendingUpIcon className="text-green-500 w-[13px]" />
													) : (
														<TrendingDownIcon className="text-red-500 w-[13px]" />
													)}
													{trade.orderType}
												</small>
											</div>
										</td>

										{/* risk ratio */}
										<td className={`${styles.table.td} hidden md:table-cell`}>
											<span className="font-medium">
												{trade.risk.ratio || "- : -"}
											</span>
											<small className="text-[11px] text-slate-500">
												{trade.risk.percent || "%"}
											</small>
										</td>

										{/* entry */}
										<td
											className={`${styles.table.td} hidden md:table-cell font-medium`}
										>
											{trade.execution.entry}
										</td>

										{/* stop loss */}
										<td className={styles.table.td}>
											<div>
												<h3 className="font-medium">
													{trade.execution.stopLoss.point}
												</h3>
												<small className="text-red-500 text-[11px]">
													-$
													{parseFloat(
														trade.execution.stopLoss.usdValue
													).toFixed(2)}
												</small>
											</div>
										</td>

										{/* take profit */}
										<td className={styles.table.td}>
											<div>
												<h3 className="font-medium">
													{trade.execution.takeProfit.point}
												</h3>
												<small className="text-green-500 text-[11px]">
													+$
													{parseFloat(
														trade.execution.takeProfit.usdValue
													).toFixed(2)}
												</small>
											</div>
										</td>

										{/* status */}
										<td className={`${styles.table.td} hidden md:table-cell`}>
											<div className="flex flex-col gap-1">
												<span
													className={`px-2 py-1 rounded-lg text-xs font-medium ${
														trade.performance.status === "open"
															? "bg-green-100 text-green-600"
															: "bg-red-100 text-red-600"
													} text-center`}
												>
													{trade.performance.status}
												</span>
												<small className="text-[11px] text-slate-500">
													{trade.performance.result || "pending"}
												</small>
											</div>
										</td>

										{/* date */}
										<td className={`${styles.table.td} hidden md:table-cell`}>
											<span>
												<h3 className="font-medium">
													{format(new Date(trade.createdAt), "dd MMM")}
												</h3>
												<small className="text-[11px] text-slate-500">
													{format(new Date(trade.createdAt), "hh:mm a")}
												</small>
											</span>
										</td>

										{/* action */}
										<td className={styles.table.td}>
											<select
												className="border rounded-lg px-2 py-1 text-sm bg-white dark:bg-slate-800 dark:text-slate-200"
												value={action}
												onChange={(e) => handleAction(e, trade)}
											>
												{trade.performance.status === "open" ? (
													<>
														<option value="">Select Action</option>
														<option value="edit">Edit</option>
														<option value="close">Close</option>
													</>
												) : (
													<>
														<option value="">Select Action</option>
														<option value="">No action</option>
													</>
												)}
											</select>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					<div className="text-center py-6 text-slate-500">
						<h3>You have no trades</h3>
					</div>
				)}
			</div>

			{/* pagination */}
			{showFooter && tradesPagination && (
				<div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
					<div className="text-sm text-slate-500">
						Page {page} of {tradesPagination?.totalPages} • Total trades:{" "}
						{tradesPagination?.totalTrades}
					</div>
					<div className="flex items-center gap-2">
						<button onClick={handlePrev} disabled={page <= 1}>
							Prev
						</button>
						<button
							onClick={handleNext}
							disabled={page >= tradesPagination?.totalPages}
						>
							Next
						</button>
					</div>
				</div>
			)}

			{/* modals */}
			{action === "edit" && (
				<UpdateTrade trade={tradeData} closeModal={closeModal} />
			)}
			{action === "close" && (
				<Closetrade trade={tradeData} closeModal={closeModal} />
			)}
		</div>
	);
};

export default Recentactivity;
