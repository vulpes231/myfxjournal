import React, { useEffect, useState } from "react";
import Custominput from "./Custominput";
import { useDispatch, useSelector } from "react-redux";
import {
	resetUpdateTrade,
	selectTradeSlice,
	updateTrade,
} from "../features/tradeSlice";
import { btc, eur, gbp, gold, usa } from "../assets";
import Loadingmodal from "./Loadingmodal";
import Errormodal from "./Errormodal";
import Successmodal from "./Successmodal";

const UpdateTrade = ({ trade, closeModal }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({ sl: "", tp: "" });
	const [error, setError] = useState("");

	const { updateTradeLoading, updateTradeError, tradeUpdated } =
		useSelector(selectTradeSlice);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			tradeId: trade?._id,
			stopLoss: form.sl,
			takeProfit: form.tp,
		};
		dispatch(updateTrade(data));
	};

	useEffect(() => {
		if (updateTradeError) setError(updateTradeError);
	}, [updateTradeError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				setError("");
				dispatch(resetUpdateTrade());
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	useEffect(() => {
		let timeout;
		if (tradeUpdated) {
			timeout = setTimeout(() => {
				dispatch(resetUpdateTrade());
				window.location.reload();
			}, 2000);
		}
		return () => clearTimeout(timeout);
	}, [tradeUpdated]);

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
		<section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<form
				onSubmit={handleSubmit}
				className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-6 animate-fadeIn"
			>
				{/* Header */}
				<div className="flex justify-between items-center">
					<h3 className="text-xl md:text-2xl font-semibold">Update Trade</h3>
					<button
						type="button"
						onClick={closeModal}
						className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition"
					>
						✕
					</button>
				</div>

				<hr className="border border-slate-200 dark:border-slate-700" />

				{/* Trade Info */}
				<div className="flex items-center gap-3">
					<img src={icon} alt="" className="w-10 h-10 rounded-full" />
					<div>
						<h6 className="text-lg font-medium flex items-center gap-2">
							{trade?.asset}
							<span
								className={`text-sm px-2 py-0.5 rounded-md ${
									trade?.orderType === "buy"
										? "bg-green-100 text-green-600"
										: "bg-red-100 text-red-600"
								}`}
							>
								{trade?.orderType}
							</span>
						</h6>
						<p className="text-xs text-slate-500">
							Entry:{" "}
							<span className="font-medium">{trade.execution.entry}</span>
						</p>
					</div>
				</div>

				{/* Inputs */}
				<div className="space-y-4">
					<Custominput
						label="Stop Loss"
						value={form.sl}
						handleChange={handleChange}
						name="sl"
						type="number"
					/>
					<Custominput
						label="Take Profit"
						value={form.tp}
						handleChange={handleChange}
						name="tp"
						type="number"
					/>
				</div>

				{/* Actions */}
				<div className="flex items-center gap-4 pt-2">
					<button
						className="w-full bg-blue-600 hover:bg-blue-700 text-white h-[42px] rounded-lg font-medium transition"
						type="submit"
					>
						Update
					</button>
					<button
						className="w-full bg-slate-400 hover:bg-slate-500 text-white h-[42px] rounded-lg font-medium transition"
						type="button"
						onClick={closeModal}
					>
						Cancel
					</button>
				</div>
			</form>

			{/* Modals */}
			{updateTradeLoading && (
				<Loadingmodal
					loadingText="Updating Trade"
					isOpen={updateTradeLoading}
				/>
			)}
			{error && (
				<Errormodal error={error} isOpen={error} onClose={() => setError("")} />
			)}
			{tradeUpdated && (
				<Successmodal
					successText="Trade updated successfully."
					isOpen={tradeUpdated}
					onClose={() => dispatch(resetUpdateTrade())}
				/>
			)}
		</section>
	);
};

export default UpdateTrade;
