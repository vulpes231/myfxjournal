import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
	resetUpdateBalance,
	selectWalletSlice,
	updateBalance,
} from "../features/walletSlice";
import Custominput from "./Custominput";
import Loadingmodal from "./Loadingmodal";
import Errormodal from "./Errormodal";
import Successmodal from "./Successmodal";

const Editbalance = ({ walletId, setModify }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({ balance: "" });
	const [error, setError] = useState("");

	const { balanceUpdated, updateBalanceLoading, updateBalanceError } =
		useSelector(selectWalletSlice);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { ...form, walletId };
		dispatch(updateBalance(data));
	};

	// Error handling
	useEffect(() => {
		if (updateBalanceError) setError(updateBalanceError);
	}, [updateBalanceError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetUpdateBalance());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	// Success handling
	useEffect(() => {
		let timeout;
		if (balanceUpdated) {
			timeout = setTimeout(() => {
				dispatch(resetUpdateBalance());
				window.location.reload();
			}, 2000);
		}
		return () => clearTimeout(timeout);
	}, [balanceUpdated]);

	return (
		<section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-white/20 backdrop-blur-sm">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 md:p-8 space-y-6 animate-fadeIn"
			>
				{/* Header */}
				<div className="flex justify-between items-center border-b pb-3">
					<h3 className="text-lg md:text-xl font-semibold">
						Update Wallet Balance
					</h3>
					<MdClose
						className="w-6 h-6 cursor-pointer hover:text-red-500 transition"
						onClick={() => setModify(false)}
					/>
				</div>

				{/* Input */}
				<Custominput
					name="balance"
					value={form.balance}
					handleChange={handleChange}
					label="Account Balance ($)"
					type="text"
					placeHolder="Enter new balance"
				/>

				{/* Actions */}
				<div className="flex justify-end gap-4 pt-4 border-t">
					<button
						type="button"
						onClick={() => setModify(false)}
						className="px-5 py-2 rounded-lg font-medium bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-6 py-2 rounded-lg font-semibold text-white bg-[#1FA9D2] hover:bg-[#1889ad] shadow-md transition"
					>
						Update
					</button>
				</div>
			</form>

			{/* Status Modals */}
			{updateBalanceLoading && (
				<Loadingmodal loadingText="Updating balance..." isOpen={true} />
			)}
			{error && (
				<Errormodal error={error} isOpen={true} onClose={() => setError("")} />
			)}
			{balanceUpdated && (
				<Successmodal
					successText="Balance updated!"
					isOpen={true}
					onClose={() => dispatch(resetUpdateBalance())}
				/>
			)}
		</section>
	);
};

export default Editbalance;
