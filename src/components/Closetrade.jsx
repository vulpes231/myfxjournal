import React, { useEffect, useState } from "react";
import Custominput from "./Custominput";
import { useDispatch, useSelector } from "react-redux";
import {
	closeTrade,
	resetCloseTrade,
	selectTradeSlice,
} from "../features/tradeSlice";
import Loadingmodal from "./Loadingmodal";
import Errormodal from "./Errormodal";
import Successmodal from "./Successmodal";
import { btc, eur, gbp, gold, usa } from "../assets";

const Closetrade = ({ trade, closeModal }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({ closePrice: "" });
	const [error, setError] = useState("");

	const { closeTradeLoading, closeTradeError, tradeClosed } =
		useSelector(selectTradeSlice);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(closeTrade({ tradeId: trade?._id, closePrice: form.closePrice }));
	};

	// Error handler
	useEffect(() => {
		if (closeTradeError) setError(closeTradeError);
	}, [closeTradeError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				setError("");
				dispatch(resetCloseTrade());
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	// Success handler
	useEffect(() => {
		let timeout;
		if (tradeClosed) {
			timeout = setTimeout(() => {
				dispatch(resetCloseTrade());
				window.location.reload();
			}, 2500);
		}
		return () => clearTimeout(timeout);
	}, [tradeClosed]);

	// Get asset icon
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
		<section className="fixed inset-0 w-full h-screen bg-black/50 dark:bg-white/50 flex items-center justify-center p-4 z-50">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md bg-white dark:bg-slate-900 p-6 md:p-8 rounded-lg shadow-lg flex flex-col gap-6 relative"
			>
				{/* Header */}
				<div className="flex justify-between items-center">
					<h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100">
						Close Trade
					</h3>
					<button
						type="button"
						onClick={closeModal}
						className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition"
					>
						✕
					</button>
				</div>
				<hr className="border border-slate-200 dark:border-slate-700" />

				{/* Trade Info */}
				<div className="flex items-center gap-3">
					<img
						src={icon}
						alt={trade?.asset}
						className="w-10 h-10 rounded-full"
					/>
					<div>
						<h6 className="uppercase font-bold flex items-center gap-2">
							{trade?.asset}
							<span
								className={`${
									trade?.orderType === "buy" ? "text-green-500" : "text-red-500"
								} text-sm font-medium capitalize`}
							>
								{trade?.orderType}
							</span>
						</h6>
						<p className="text-sm text-slate-500 dark:text-slate-400">
							Entry: {trade?.execution?.entry}
						</p>
					</div>
				</div>

				{/* Input */}
				<Custominput
					label="Closing Price"
					value={form.closePrice}
					handleChange={handleChange}
					name="closePrice"
					placeholder="Enter price"
				/>

				{/* Buttons */}
				<div className="flex items-center gap-4">
					<button
						className="w-full bg-red-500 hover:bg-red-600 transition h-[42px] rounded-lg text-white font-medium"
						type="submit"
					>
						Close Trade
					</button>
					<button
						className="w-full bg-gray-400 hover:bg-gray-500 transition h-[42px] rounded-lg text-white font-medium"
						type="button"
						onClick={closeModal}
					>
						Cancel
					</button>
				</div>
			</form>

			{/* Modals */}
			{closeTradeLoading && (
				<Loadingmodal
					loadingText="Closing Trade..."
					isOpen={closeTradeLoading}
				/>
			)}
			{error && (
				<Errormodal error={error} isOpen={error} onClose={() => setError("")} />
			)}
			{tradeClosed && (
				<Successmodal
					successText="Trade closed successfully."
					isOpen={tradeClosed}
				/>
			)}
		</section>
	);
};

export default Closetrade;
