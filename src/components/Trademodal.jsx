import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Custominput from "./Custominput";
import { styles } from "../styles";

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
	return (
		<div
			className={
				showModal
					? "fixed h-screen flex flex-col items-center justify-center top-0 w-full left-0 p-6 z-10 bg-black bg-opacity-70"
					: "hidden "
			}
		>
			<form
				action=""
				className="flex flex-col gap-4 p-4 w-full bg-white md:w-2xl"
			>
				<span
					onClick={closeModal}
					className="text-xl flex justify-end cursor-pointer text-black"
				>
					<MdClose />
				</span>
				<select className={`${styles.select} uppercase`}>
					<option value="">Select Asset</option>
					{assets.map((asset) => {
						return (
							<option value={asset.name} key={asset.id}>
								{asset.name}
							</option>
						);
					})}
				</select>
				<select className={`${styles.select} uppercase`}>
					<option value="">Select Order Type</option>
					<option value="buy">buy</option>
					<option value="sell">sell</option>
				</select>

				<Custominput placeHolder={"Risk Ratio e.g 1:3"} label={"risk reward"} />
				<Custominput placeHolder={"0.00"} label={"entry"} />
				<Custominput placeHolder={"0.00"} label={"take profit"} />
				<Custominput placeHolder={"0.00"} label={"stop loss"} />
				<Custominput placeHolder={"0.0"} label={"lot size"} />

				<button
					className={`p-2 capitalize rounded-[5px] text-[#fff] w-full h-[40px] md:h-[46px] md:w-[140px] font-semibold shadow cursor-pointer bg-[#1FA9D2]`}
				>
					add trade
				</button>
			</form>
		</div>
	);
};

export default Trademodal;
