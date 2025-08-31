import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTradeSlice, selectUserTrades } from "../features/tradeSlice";
import { gbp } from "../assets";
import { format } from "date-fns";

const Recentactivity = () => {
	const [form, setForm] = useState({
		action: "",
	});

	const { userTrades, tradesPagination } = useSelector(selectTradeSlice);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	useEffect(() => {
		if (tradesPagination) {
			console.log(tradesPagination);
		}
	}, [tradesPagination]);
	return (
		<div>
			<h3 className="text-[16px] md:text-[24px] font-bold capitalize">
				recent trades
			</h3>
			<div className="overflow-auto mt-10">
				<table className="text-center mt-5 min-w-full">
					<thead className="bg-slate-200 text-black capitalize">
						<tr>
							<th>date</th>
							<th>asset</th>
							<th>position</th>
							<th>risk ratio</th>
							<th>entry</th>
							<th>lot size</th>
							<th>status</th>
							<th>action</th>
						</tr>
					</thead>
					<tbody className="uppercase font-thin">
						{userTrades &&
							userTrades.length > 0 &&
							userTrades.map((trade) => {
								return (
									<tr key={trade._id}>
										<td>{format(trade.createdAt, "dd MMM, yyyy hh:mm a")}</td>
										<td>
											<span className="flex items-center gap-2">
												<img
													src={trade.asset.startsWith("g") ? gbp : null}
													alt=""
													className="w-[20px] h-[20px] rounded-full"
												/>
												<h3>{trade.asset}</h3>
											</span>
										</td>
										<td>{trade.orderType}</td>
										<td>{trade.riskRatio}</td>
										<td>{trade.execution.entry}</td>
										<td>{trade.execution.lotSize}</td>
										<td>{trade.status}</td>
										<td>
											<select name="" id="">
												<option value="">Select Action</option>
												{[
													{ id: "cancel", name: "cancel" },
													{ id: "close", name: "close" },
												].map((op) => {
													return (
														<option key={op.id} value={op.id}>
															{op.name}
														</option>
													);
												})}
											</select>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			{/* pagination */}
			<div className="flex justify-between">
				<h3>
					page {tradesPagination.currentPage} of {tradesPagination.totalPages}
				</h3>
				<h3>Total trades: {tradesPagination.totalTrades}</h3>
			</div>
		</div>
	);
};

export default Recentactivity;
