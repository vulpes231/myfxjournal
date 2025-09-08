import React, { useEffect, useState } from "react";
import Customselect from "./Customselect";
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

		console.log(trade);

		const data = {
			tradeId: trade?._id,
			closingPrice: form.closePrice,
		};
		// console.log(data);
		dispatch(closeTrade(data));
	};

	useEffect(() => {
		if (closeTradeError) {
			setError(closeTradeError);
		}
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

	useEffect(() => {
		let timeout;
		if (tradeClosed) {
			timeout = setTimeout(() => {
				dispatch(resetCloseTrade());
				window.location.reload();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [tradeClosed]);

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
		<section className="fixed top-0 left-0 w-full h-screen bg-black/50 dark:bg-white/50 flex items-center justify-center p-6">
			<form
				onSubmit={handleSubmit}
				action=""
				className="bg-white dark:bg-slate-900 p-8 rounded-sm md:rounded-lg shadow-sm flex flex-col gap-6"
			>
				<h3 className="font-bold text-[18px] md:text-[24px]">Close Trade</h3>
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
					label={"closing price"}
					value={form.closePrice}
					handleChange={handleChange}
					name={"closePrice"}
				/>
				<div className="flex items-center gap-6">
					<button
						className="w-full bg-[#1FA9D2] h-[40px] rounded-sm md:rounded-lg text-white"
						type="submit"
					>
						close
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
			{closeTradeLoading && <Loadingmodal loadingText={"Closing Trade"} />}
			{error && <Errormodal error={error} />}
			{tradeClosed && <Successmodal successText={"Trade closed."} />}
		</section>
	);
};

export default Closetrade;
