import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallets, selectUserWallets } from "../features/walletSlice";
import { getAccessToken } from "../constants";
import Infocard from "./Infocard";

import {
	TrendingUp,
	Percent,
	DollarSign,
	LucideWallet,
	LucideEdit,
} from "lucide-react";
import { styles } from "../styles";
import Editbalance from "./Editbalance";
import {
	getTradeAnalytics,
	selectAnalyticSlice,
} from "../features/analyticSlice";

const Wallet = () => {
	const dispatch = useDispatch();
	const token = getAccessToken();

	const [selectedWalletId, setSelectedWalletId] = useState("");
	const [activeWallet, setActiveWallet] = useState(null);
	const [modifyBalance, setModifyBalance] = useState(false);

	const userWallets = useSelector(selectUserWallets);
	const { tradeAnalytics } = useSelector(selectAnalyticSlice);

	useEffect(() => {
		if (token) {
			dispatch(getUserWallets());
			dispatch(getTradeAnalytics());
		}
	}, [token]);

	const handleSelect = (e) => {
		// console.log(e.target);
		setSelectedWalletId(e.target.value);
	};

	useEffect(() => {
		if (selectedWalletId) {
			const wallet = userWallets.find(
				(wallet) => wallet._id === selectedWalletId
			);
			setActiveWallet(wallet);
		}
	}, [selectedWalletId]);

	useEffect(() => {
		if (userWallets && userWallets.length > 0) {
			setActiveWallet(userWallets[0]);
			setSelectedWalletId(userWallets[0]._id);
		}
	}, [userWallets]);

	useEffect(() => {
		if (tradeAnalytics) {
			console.log(tradeAnalytics);
		}
	}, [tradeAnalytics]);

	return (
		<div className="">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 capitalize">
				<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 flex flex-col justify-between w-full gap-6">
					<select
						name="selectedWalletId"
						onChange={handleSelect}
						value={selectedWalletId}
						className={styles.select}
					>
						<option value="">Select Wallet</option>
						{userWallets?.map((wallet) => (
							<option value={wallet._id} key={wallet._id}>
								{wallet.name === "wallet 1" && "Forex Account"}
							</option>
						))}
					</select>

					{/* Balance Section */}
					<div className="flex flex-col justify-between h-full">
						<div className="flex flex-col items-center">
							<p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide flex items-center gap-1">
								Balance
							</p>
							<p className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-1 flex items-center gap-2">
								<LucideWallet />$
								{parseFloat(activeWallet?.balance || 0).toFixed(2)}
							</p>
						</div>
						<span
							onClick={() => setModifyBalance(true)}
							className="text-[10px] flex items-center gap-1 cursor-pointer"
						>
							<LucideEdit className="w-3 h-3" /> Edit balance
						</span>
					</div>
				</div>
				<Infocard
					title="Trades"
					// sub="0"
					icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
					footer={[
						{ label: "open", value: tradeAnalytics?.totalOpen },
						{ label: "closed", value: tradeAnalytics?.totalClosed },
					]}
					// color={"text-gray-800 dark:text-gray-200"}
				/>

				<Infocard
					title="Stats"
					// sub={`${activeWallet?.winRate || 0}%`}
					icon={<Percent className="w-6 h-6 text-green-600" />}
					footer={[
						{
							label: "winrate",
							value: `${parseFloat(tradeAnalytics?.winRate).toFixed(1)}%`,
						},
						{ label: "trades won", value: tradeAnalytics?.totalWins },
					]}
					// color={"text-gray-800 dark:text-gray-200"}
				/>

				<Infocard
					title="Profit / Loss"
					// sub={activeWallet?.profitLoss || 0}
					icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
					footer={[
						{
							label: "profit",
							value: `$${parseFloat(tradeAnalytics?.totalProfit).toFixed(2)}`,
						},
						{
							label: "loss",
							value: `$${parseFloat(tradeAnalytics?.totalLoss).toFixed(2)}`,
						},
					]}
					// color={
					// 	tradeAnalytics?.totalProfit ? "text-green-500" : "text-green-500"
					// }
				/>
			</div>
			{modifyBalance && (
				<Editbalance
					walletId={activeWallet?._id}
					setModify={setModifyBalance}
				/>
			)}
		</div>
	);
};

export default Wallet;
