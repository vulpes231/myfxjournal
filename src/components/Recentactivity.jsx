import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTradeSlice } from "../features/tradeSlice";
import { eur, gbp, gold, jpy, usa } from "../assets";
import { format } from "date-fns";
import { styles } from "../styles";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";

const Recentactivity = ({ tableTitle, showFooter, count }) => {
	const { userTrades, tradesPagination } = useSelector(selectTradeSlice);
	const [page, setPage] = useState(tradesPagination?.currentPage || 1);

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
				<h3 className="text-lg md:text-2xl font-bold capitalize mb-6">
					{tableTitle}
				</h3>
				<select name="" id="">
					<option value="">Filter By</option>
					<option value="orderType">Position</option>
					<option value="asset">Asset</option>
					<option value="status">Status</option>
				</select>
			</div>

			<div className="overflow-x-auto">
				{userTrades.length > 0 ? (
					<table className="w-full border-collapse text-sm md:text-base">
						<thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
							<tr>
								{/* date (hidden on mobile) */}
								<th className={`${styles.table.th} hidden md:table-cell`}>
									Date
								</th>
								<th className={styles.table.th}>Asset</th>
								<th className={styles.table.th}>Position</th>
								{/* risk ratio (hidden on mobile) */}
								<th className={`${styles.table.th} hidden md:table-cell`}>
									Risk Ratio
								</th>
								{/* entry (hidden on mobile) */}
								<th className={`${styles.table.th} hidden md:table-cell`}>
									Entry
								</th>
								{/* lot size (hidden on mobile) */}
								<th className={`${styles.table.th} hidden md:table-cell`}>
									Lot Size
								</th>
								<th className={styles.table.th}>Status</th>
								<th className={`${styles.table.th} hidden md:table-cell`}>
									Outcome
								</th>
								<th className={styles.table.th}>Action</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-200 dark:divide-slate-700 uppercase font-thin">
							{userTrades.slice(0, docCount).map((trade) => {
								const icon =
									trade.asset === "gu"
										? gbp
										: trade.asset === "gold"
										? gold
										: trade.asset === "eu"
										? eur
										: trade.asset.startsWith("u")
										? usd
										: trade.asset === "btc"
										? btc
										: null;
								return (
									<tr
										key={trade._id}
										className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
									>
										{/* date */}
										<td className={`${styles.table.td} hidden md:table-cell`}>
											{format(new Date(trade.createdAt), "dd MMM, hh:mm a")}
										</td>
										{/* asset */}
										<td className={styles.table.td}>
											<span className="flex items-center gap-2">
												{icon && (
													<img
														src={icon}
														alt=""
														className="w-5 h-5 rounded-full"
													/>
												)}
												<span className="font-medium">{trade.asset}</span>
											</span>
										</td>
										{/* position */}
										<td className={styles.table.td}>
											<span className="flex items-center gap-2">
												{trade.orderType === "buy" ? (
													<TrendingUpIcon className="text-green-500" />
												) : (
													<TrendingDownIcon className="text-red-500" />
												)}
												{trade.orderType}
											</span>
										</td>
										{/* risk ratio */}
										<td className={`${styles.table.td} hidden md:table-cell`}>
											{trade.riskRatio}
										</td>
										{/* entry */}
										<td className={`${styles.table.td} hidden md:table-cell`}>
											{trade.execution.entry}
										</td>
										{/* lot size */}
										<td className={`${styles.table.td} hidden md:table-cell`}>
											{trade.execution.lotSize}
										</td>
										{/* status */}
										<td className={styles.table.td}>
											<span
												className={`px-2 py-1 rounded-lg text-xs font-semibold ${
													trade.status === "open"
														? "bg-green-100 text-green-600"
														: "bg-red-100 text-red-600"
												}`}
											>
												{trade.status}
											</span>
										</td>
										<td className={styles.table.td}>
											<span
												className={`px-2 py-1 rounded-lg text-xs font-semibold`}
											>
												{trade?.outcome || "pending"}
											</span>
										</td>
										{/* action */}
										<td className={styles.table.td}>
											<select className="border rounded-lg px-2 py-1 text-sm">
												<option value="">Select Action</option>
												<option value="edit">Edit</option>
												<option value="cancel">Cancel</option>
												<option value="close">Close</option>
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
						<button
							// variant="outline"
							size="sm"
							onClick={handlePrev}
							disabled={page <= 1}
						>
							Prev
						</button>
						<button
							// variant="outline"
							size="sm"
							onClick={handleNext}
							disabled={page >= tradesPagination?.totalPages}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Recentactivity;
