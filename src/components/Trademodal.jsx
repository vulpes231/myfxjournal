import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
	createTrade,
	resetCreateTrade,
	selectTradeSlice,
} from "../features/tradeSlice";
import Loadingmodal from "./Loadingmodal";
import Successmodal from "./Successmodal";
import Errormodal from "./Errormodal";
import Custominput from "./Custominput";
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
		dispatch(createTrade(form));
	};

	useEffect(() => {
		if (createTradeError) setError(createTradeError);
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
			}, 2000);
		}
		return () => clearTimeout(timeout);
	}, [tradeCreated]);

	useEffect(() => {
		if (token) dispatch(fetchAssets());
	}, [dispatch, token]);

	return (
		<div
			className={`${
				showModal ? "fixed" : "hidden"
			} inset-0 z-50 flex items-center bg-black/50 backdrop-blur-sm`}
		>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-2xl bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-lg space-y-6 animate-fadeIn h-[430px] overflow-y-auto"
			>
				{/* Header */}
				<div className="flex justify-between items-center border-b pb-3">
					<h3 className="text-xl md:text-2xl font-semibold">Add a New Trade</h3>
					<MdClose
						className="w-6 h-6 cursor-pointer hover:text-red-500 transition"
						onClick={closeModal}
					/>
				</div>

				{/* Form Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Customselect
						label="Asset"
						name="assetId"
						value={form.assetId}
						handleChange={handleChange}
						optionLabel="Select Asset"
						options={assets}
					/>
					<Customselect
						label="Order Type"
						name="orderType"
						value={form.orderType}
						handleChange={handleChange}
						optionLabel="Select Order Type"
						options={[
							{ id: "buy", name: "Buy" },
							{ id: "sell", name: "Sell" },
						]}
					/>
					<Custominput
						type="text"
						name="lotSize"
						value={form.lotSize}
						handleChange={handleChange}
						label="Lot Size"
						placeHolder="0.01"
					/>
					<Customselect
						label="Wallet"
						name="walletId"
						value={form.walletId}
						handleChange={handleChange}
						optionLabel="Select Wallet"
						options={userWallets}
					/>
					<Custominput
						type="text"
						name="entry"
						value={form.entry}
						handleChange={handleChange}
						label="Entry Price"
						placeHolder="0.00"
					/>
					<Custominput
						type="text"
						name="takeProfit"
						value={form.takeProfit}
						handleChange={handleChange}
						label="Take Profit"
						placeHolder="0.00"
					/>
					<Custominput
						type="text"
						name="stopLoss"
						value={form.stopLoss}
						handleChange={handleChange}
						label="Stop Loss"
						placeHolder="0.00"
					/>
				</div>

				{/* Actions */}
				<div className="flex justify-end gap-4 pt-4 border-t">
					<button
						type="button"
						onClick={closeModal}
						className="px-6 py-2 rounded-lg font-medium bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-6 py-2 rounded-lg font-semibold text-white bg-[#1FA9D2] hover:bg-[#1889ad] shadow-md transition"
					>
						Add Trade
					</button>
				</div>
			</form>

			{/* Modals */}
			{createTradeLoading && (
				<Loadingmodal loadingText="Creating trade..." isOpen={true} />
			)}
			{tradeCreated && (
				<Successmodal successText="Trade Created!" isOpen={true} />
			)}
			{error && (
				<Errormodal error={error} isOpen={true} onClose={() => setError("")} />
			)}
		</div>
	);
};

export default Trademodal;
