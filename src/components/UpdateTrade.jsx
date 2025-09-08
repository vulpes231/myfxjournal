import React, { useEffect, useState } from "react";
import Custominput from "./Custominput";
import { useDispatch, useSelector } from "react-redux";
import {
	resetUpdateTrade,
	selectTradeSlice,
	updateTrade,
} from "../features/tradeSlice";
import { btc, eur, gbp, gold, usa } from "../assets";

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
		console.log(data);
		dispatch(updateTrade(data));
	};

	useEffect(() => {
		if (updateTradeError) {
			setError(updateTradeError);
		}
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
		<section className="w-full h-screen bg-black/50 dark:bg-white/50 flex items-center justify-center p-6 fixed top-0 left-0">
			<form
				onSubmit={handleSubmit}
				action=""
				className="bg-white dark:bg-slate-900 p-8 rounded-sm md:rounded-lg shadow-sm flex flex-col gap-6"
			>
				<h3 className="font-bold text-[18px] md:text-[24px]">Update Trade</h3>
				<hr className="border-[0.5px] border-[#dedede] dark:border-slate-800" />

				<div className="flex items-center gap-2">
					<img src={icon} alt="" className="w-[35px] rounded-full" />
					<h6 className="uppercase flex items-center gap-2 font-black">
						{trade?.asset}{" "}
						<small
							className={`${
								trade?.orderType === "buy" ? "text-green-500" : "text-red-500"
							} capitalize font-normal`}
						>
							{trade?.orderType}
						</small>
					</h6>
				</div>
				<Custominput
					label={"stop loss"}
					value={form.sl}
					handleChange={handleChange}
					name={"sl"}
				/>
				<Custominput
					label={"take profit"}
					value={form.tp}
					handleChange={handleChange}
					name={"tp"}
				/>
				<div className="flex items-center gap-6">
					<button
						className="w-full bg-[#1FA9D2] h-[40px] rounded-sm md:rounded-lg text-white"
						type="submit"
					>
						update
					</button>
					<button
						className="w-full bg-[#979797] h-[40px] rounded-sm md:rounded-lg text-white"
						type="button"
						onClick={closeModal}
					>
						cancel
					</button>
				</div>
			</form>
			{updateTradeLoading && <Loadingmodal loadingText={"Updating Trade"} />}
			{error && <Errormodal error={error} />}
			{tradeUpdated && <Successmodal successText={"Trade updated."} />}
		</section>
	);
};

export default UpdateTrade;
