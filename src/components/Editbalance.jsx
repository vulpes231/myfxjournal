import React, { useEffect, useState } from "react";
import Custominput from "./Custominput";
// import { LucidePanelTopClose } from "lucide-react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
	resetUpdateBalance,
	selectWalletSlice,
	updateBalance,
} from "../features/walletSlice";
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
		console.log(data);
		dispatch(updateBalance(data));
	};

	useEffect(() => {
		if (updateBalanceError) {
			setError(updateBalanceError);
		}
	}, [updateBalanceError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetUpdateBalance);
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	useEffect(() => {
		let timeout;
		if (balanceUpdated) {
			timeout = setTimeout(() => {
				dispatch(resetUpdateBalance);
				window.location.reload();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [balanceUpdated]);

	return (
		<section className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black/70 dark:bg-white/70">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-white dark:bg-slate-900 p-6"
			>
				<div className="flex justify-end mb-4">
					<MdClose
						className="text-white cursor-pointer"
						onClick={() => setModify(false)}
					/>
				</div>
				<Custominput
					name={"balance"}
					value={form.balance}
					handleChange={handleChange}
					label={"Account Balance"}
					type={"text"}
				/>
				<button type="submit">update</button>
			</form>
			{updateBalanceLoading && (
				<Loadingmodal
					loadingText={"Updating balance"}
					isOpen={updateBalanceLoading}
				/>
			)}
			{error && (
				<Errormodal error={error} isOpen={error} onClose={() => setError("")} />
			)}
			{balanceUpdated && (
				<Successmodal
					successText={"Balance updated"}
					isOpen={balanceUpdated}
					onClose={() => dispatch(resetUpdateBalance())}
				/>
			)}
		</section>
	);
};

export default Editbalance;
