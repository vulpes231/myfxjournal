import React, { useState } from "react";
import Trademodal from "./Trademodal";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUsername } from "../features/userSlice";
import Recentactivity from "./Recentactivity";
import Wallet from "./Wallet";

const Content = () => {
	const [showModal, setshowModal] = useState(false);
	const username = useSelector(selectUsername);
	const currentLogin = JSON.parse(sessionStorage.getItem("lastLogin"));

	const closeModal = () => {
		setshowModal(false);
	};

	// const handleAction = (e, tradeId) => {
	// 	setAction(e.target.value);
	// 	console.log(tradeId);
	// 	setTradeId(tradeId);
	// };

	// const closeActionModal = () => {
	// 	setAction("");
	// 	setTradeId(null);
	// };

	return (
		<section className="p-6 w-full min-h-screen pt-28 md:pt-32 text-slate-600 dark:text-gray-300">
			<div className="flex flex-col gap-6 md:max-w-[750px] lg:max-w-[1100px] md:mx-auto">
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

				<Wallet />
				{/* journal */}

				<Recentactivity
					tableTitle={"recent trades"}
					showFooter={false}
					count={5}
				/>
				<Trademodal showModal={showModal} closeModal={closeModal} />
			</div>

			{/* {action === "edit" ? (
				<UpdateTrade tradeId={tradeId} closeModal={closeModal} />
			) : action === "close" ? (
				<Closetrade tradeId={tradeId} closeModal={closeModal} />
			) : null} */}
		</section>
	);
};

export default Content;
