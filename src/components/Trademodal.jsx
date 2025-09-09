import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Custominput from "./Custominput";
import { useDispatch, useSelector } from "react-redux";
import {
	createTrade,
	resetCreateTrade,
	selectTradeSlice,
} from "../features/tradeSlice";
import Loadingmodal from "./Loadingmodal";
import Successmodal from "./Successmodal";
import Errormodal from "./Errormodal";
import Customselect from "./Customselect";
import { selectUserWallets } from "../features/walletSlice";
import { fetchAssets, selectAssetsSlice } from "../features/assetSlice";
import { getAccessToken } from "../constants";

const initialState = {
	assetId: "",
	orderType: "",
	entry: "",
	stopLoss: "",
	takeProfit: "",
	lotSize: "",
	walletId: "",
};

const Trademodal = ({ showModal, closeModal }) => {
	const dispatch = useDispatch();
	const token = getAccessToken();
	const [form, setForm] = useState(initialState);
	const [error, setError] = useState("");

	const { createTradeLoading, createTradeError, tradeCreated } =
		useSelector(selectTradeSlice);

	const { assets } = useSelector(selectAssetsSlice);

	const userWallets = useSelector(selectUserWallets);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
		dispatch(createTrade(form));
	};

	useEffect(() => {
		if (createTradeError) {
			setError(createTradeError);
		}
	}, [createTradeError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetCreateTrade());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	useEffect(() => {
		let timeout;
		if (tradeCreated) {
			timeout = setTimeout(() => {
				dispatch(resetCreateTrade());
				setForm(initialState);
				closeModal();
				window.location.href = "/dashboard";
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [tradeCreated]);

	useEffect(() => {
		if (token) {
			dispatch(fetchAssets());
			// console.log("dispatched.");
		}
	}, [dispatch, token]);
	// console.log(assets);

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
					<Customselect
						handleChange={handleChange}
						value={form.assetId}
						name={"assetId"}
						// customClass={}
						label={"Asset"}
						optionLabel={"Select Asset"}
						options={assets}
					/>
					<Customselect
						handleChange={handleChange}
						value={form.orderType}
						name={"orderType"}
						// customClass={}
						label={"Order Type"}
						optionLabel={"Select Order Type"}
						options={[
							{ id: "buy", name: "buy" },
							{ id: "sell", name: "sell" },
						]}
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
					<Customselect
						handleChange={handleChange}
						value={form.walletId}
						name={"walletId"}
						// customClass={}
						label={"Wallet"}
						optionLabel={"Select Wallet"}
						options={userWallets}
					/>
				</div>
				<div className="flex flex-col md:flex-row gap-4 w-full ">
					{/* <Custominput
						placeHolder={"Risk Ratio e.g 1:3"}
						label={"risk reward"}
						value={form.riskRatio}
						handleChange={handleChange}
						name="riskRatio"
						type={"text"}
					/> */}
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

				<button
					className={`p-2 capitalize rounded-[5px] text-[#fff] w-full h-[40px] md:h-[46px] md:w-[140px] font-semibold shadow cursor-pointer bg-[#1FA9D2] mt-5`}
					type="submit"
				>
					add trade
				</button>
			</form>
			{createTradeLoading && (
				<Loadingmodal
					loadingText={"Creating trade"}
					isOpen={createTradeLoading}
				/>
			)}
			{tradeCreated && (
				<Successmodal successText={"Trade Created."} isOpen={tradeCreated} />
			)}
			{error && (
				<Errormodal error={error} isOpen={error} onClose={() => setError("")} />
			)}
		</div>
	);
};

export default Trademodal;
