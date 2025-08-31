import React, { useEffect, useState } from "react";
import Infocard from "./Infocard";
import Trademodal from "./Trademodal";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../features/userSlice";
import { getUserWallets, selectUserWallets } from "../features/walletSlice";
import { getAccessToken } from "../constants";
import { Md10K } from "react-icons/md";
import { TrendingUp, Percent, DollarSign } from "lucide-react"; // cleaner, modern icons
import Recentactivity from "./Recentactivity";
import { styles } from "../styles";

const Content = () => {
	const token = getAccessToken();
	const dispatch = useDispatch();
	const [showModal, setshowModal] = useState(false);
	const [selectedWalletId, setSelectedWalletId] = useState("");
	const [activeWallet, setActiveWallet] = useState(null);

	const username = useSelector(selectUsername);
	const userWallets = useSelector(selectUserWallets);

	const currentLogin = JSON.parse(sessionStorage.getItem("lastLogin"));

	const closeModal = () => {
		setshowModal(false);
	};

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
		if (token) {
			dispatch(getUserWallets());
		}
	}, [token]);

	return (
		<section className="p-6 w-full min-h-screen pt-28 md:pt-32 text-slate-600 dark:text-gray-300">
			<div className="flex flex-col gap-6 md:w-[1100px] md:mx-auto">
				<div className="flex justify-between  ">
					<div>
						<h3 className="text-[16px] font-bold capitalize">
							Welcome {username}
						</h3>
						<h6 className="text-[13px] font-normal text-slate-600/50 dark:text-gray-300/50">
							Last login: {format(currentLogin, "dd MMM, yyyy hh:mm a")}
						</h6>
					</div>
					<button
						className={`p-2 capitalize rounded-[5px] text-[#fff] w-[120px] h-[40px] md:h-[46px] md:w-[140px] font-semibold shadow cursor-pointer bg-[#1FA9D2]`}
						onClick={() => setshowModal(true)}
					>
						enter trade
					</button>
				</div>
				<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 flex flex-col gap-4 w-full max-w-sm ">
					{/* Wallet Selector */}
					<select
						name="selectedWalletId"
						onChange={handleSelect}
						value={selectedWalletId}
						className={styles.select}
					>
						<option value="">Select Wallet</option>
						{userWallets?.map((wallet) => (
							<option value={wallet._id} key={wallet._id}>
								{wallet.name}
							</option>
						))}
					</select>

					{/* Balance Section */}
					<div className="flex flex-col items-center">
						<p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">
							Balance
						</p>
						<p className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-1">
							${parseFloat(activeWallet?.balance || 0).toFixed(2)}
						</p>
					</div>
				</div>

				{/* insights */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 capitalize">
					<Infocard
						title="Trades"
						sub="0"
						icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
					/>

					<Infocard
						title="Winrate"
						sub={`${activeWallet?.winRate || 0}%`}
						icon={<Percent className="w-6 h-6 text-green-600" />}
					/>

					<Infocard
						title="Profit / Loss"
						sub={activeWallet?.profitLoss || 0}
						icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
					/>
				</div>
				{/* journal */}

				<Recentactivity />
				<Trademodal showModal={showModal} closeModal={closeModal} />
			</div>
		</section>
	);
};

export default Content;
