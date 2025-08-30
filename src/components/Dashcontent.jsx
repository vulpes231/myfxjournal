import React, { useEffect, useState } from "react";
import Infocard from "./Infocard";
import Trademodal from "./Trademodal";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../features/userSlice";
import { getUserWallets, selectUserWallets } from "../features/walletSlice";
import { getAccessToken } from "../constants";

const Content = () => {
	const token = getAccessToken();
	const dispatch = useDispatch();
	const [showModal, setshowModal] = useState(false);
	const [selectedWalletId, setSelectedWalletId] = useState(null);
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
		<section className="p-6 w-full min-h-screen pt-28 md:pt-32 ">
			<div className="flex flex-col gap-6 md:w-[1100px] md:mx-auto">
				<div className="flex justify-between  ">
					<div>
						<h3 className="text-[16px] text-[#505050] font-bold capitalize">
							Welcome {username}
						</h3>
						<h6 className="text-[13px] text-[#979797] font-normal">
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
				<div className="bg-slate-200 rounded-md text-black flex flex-col items-center capitalize p-4">
					<span>
						<select
							name="selectedWalletId"
							onChange={handleSelect}
							value={selectedWalletId}
						>
							<option value="">Wallet</option>
							{userWallets &&
								userWallets.length > 0 &&
								userWallets.map((wallet) => {
									return (
										<option value={wallet._id} key={wallet._id}>
											{wallet.name}
										</option>
									);
								})}
						</select>
					</span>
					<p className="font-bold">Balance</p>
					<p>{parseFloat(activeWallet?.balance).toFixed(2) || "0.00"}</p>
				</div>

				{/* insights */}
				<div className="flex justify-between capitalize gap-4">
					<Infocard title={"Trades"} sub={"0"} />
					<Infocard title={"Winrate"} sub={`${activeWallet?.winRate || 0}%`} />
					<Infocard
						title={"Profit / Loss"}
						sub={activeWallet?.profitLoss || 0}
					/>
				</div>
				{/* journal */}

				<div className="overflow-auto ">
					<h3>recent trades</h3>
					<table className="text-center mt-5 min-w-full">
						<thead className="bg-slate-200 text-black capitalize">
							<tr>
								<th>s/n</th>
								<th>market</th>
								<th>position</th>
								<th className="uppercase">rr</th>
								<th>risk</th>
								<th>outcome</th>
								<th>reward</th>
							</tr>
						</thead>
						<tbody className="uppercase font-thin">
							<tr>
								<td>1.</td>
								<td>xau/usd</td>
								<td>buy</td>
								<td>1:3</td>
								<td>0.25%</td>
								<td>lost</td>
								<td>-1</td>
							</tr>
						</tbody>
					</table>
				</div>
				<Trademodal showModal={showModal} closeModal={closeModal} />
			</div>
		</section>
	);
};

export default Content;
