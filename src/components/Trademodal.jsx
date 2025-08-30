import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Custominput from "./Custominput";
import { styles } from "../styles";
import { useSelector } from "react-redux";
import { selectTradeSlice } from "../features/tradeSlice";

const assets = [
	{
		id: "gold",
		name: "xau/usd",
	},
	{
		id: "gu",
		name: "gbp/usd",
	},
	{
		id: "eu",
		name: "eur/usd",
	},
	{
		id: "uj",
		name: "usd/jpy",
	},
	{
		id: "u30",
		name: "us30",
	},
	{
		id: "btc",
		name: "btc/usd",
	},
];

const Trademodal = ({ showModal, closeModal }) => {
	const [form, setForm] = useState({
		asset: "",
		orderType: "",
		riskRatio: "",
		entry: "",
		stopLoss: "",
		takeProfit: "",
		lotSize: "",
		walletId: "",
	});

	const { createTradeLoading, createTradeError, tradeCreated } =
		useSelector(selectTradeSlice);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
	};
	return (
		<div
			className={
				showModal
					? "fixed h-screen flex flex-col items-center justify-center top-0 w-full left-0 p-6 z-10 bg-black/20 dark:bg-white/20 bg-opacity-70"
					: "hidden "
			}
		>
			<form
				action=""
				className="flex flex-col gap-4 w-full bg-white dark:bg-slate-900 md:w-2xl p-10 rounded-2xl"
				onSubmit={handleSubmit}
			>
				<span onClick={closeModal} className=" flex justify-between ">
					<h3 className="text-[16px] md:text-[22px] font-bold">
						Add a New Trade
					</h3>
					<MdClose className="w-6 h-6 cursor-pointer" />
				</span>
				<div className="flex flex-col md:flex-row gap-4">
					<select
						className={`${styles.select} uppercase`}
						value={form.asset}
						onChange={handleChange}
						name="asset"
					>
						<option value="">Select Asset</option>
						{assets.map((asset) => {
							return (
								<option value={asset.name} key={asset.id}>
									{asset.name}
								</option>
							);
						})}
					</select>
					<select
						className={`${styles.select} uppercase`}
						value={form.orderType}
						onChange={handleChange}
						name="orderType"
					>
						<option value="">Select Order Type</option>
						<option value="buy">buy</option>
						<option value="sell">sell</option>
					</select>
				</div>
				<div className="flex flex-col md:flex-row gap-4 w-full ">
					<Custominput
						placeHolder={"Risk Ratio e.g 1:3"}
						label={"risk reward"}
						value={form.riskRatio}
						handleChange={handleChange}
						name="riskRatio"
						type={"text"}
					/>
					<Custominput
						placeHolder={"0.00"}
						label={"entry"}
						value={form.entry}
						handleChange={handleChange}
						name="entry"
						type={"text"}
					/>
				</div>
				<div className="flex flex-col md:flex-row gap-4 w-full">
					<Custominput
						placeHolder={"0.00"}
						label={"take profit"}
						value={form.takeProfit}
						handleChange={handleChange}
						name="takeProfit"
						type={"text"}
					/>
					<Custominput
						placeHolder={"0.00"}
						label={"stop loss"}
						value={form.stopLoss}
						handleChange={handleChange}
						name="stopLoss"
						type={"text"}
					/>
				</div>
				<div className="flex flex-col md:flex-row gap-4 w-full">
					<Custominput
						placeHolder={"0.0"}
						label={"lot size"}
						value={form.lotSize}
						handleChange={handleChange}
						name="lotSize"
						type={"text"}
					/>
					<div className="w-full"></div>
				</div>

				<button
					className={`p-2 capitalize rounded-[5px] text-[#fff] w-full h-[40px] md:h-[46px] md:w-[140px] font-semibold shadow cursor-pointer bg-[#1FA9D2] mt-5`}
					type="submit"
				>
					add trade
				</button>
			</form>
		</div>
	);
};

export default Trademodal;
