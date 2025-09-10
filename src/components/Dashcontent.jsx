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

	return (
		<section className="p-6 w-full min-h-screen pt-28 md:pt-32 text-slate-600 dark:text-gray-300">
			<div className="flex flex-col gap-6 max-w-5xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
					{/* User Info */}
					<div>
						<h3 className="text-lg md:text-xl font-bold capitalize text-slate-800 dark:text-slate-100">
							Welcome, {username}
						</h3>
						<h6 className="text-sm font-normal text-slate-500 dark:text-slate-400">
							Last login:{" "}
							<span className="font-medium">
								{format(currentLogin, "dd MMM, yyyy hh:mm a")}
							</span>
						</h6>
					</div>

					{/* Action Button */}
					<button
						className="px-5 py-2.5 md:px-6 md:py-3 capitalize rounded-lg text-white font-semibold shadow-md bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 transition-all"
						onClick={() => setshowModal(true)}
					>
						Enter Trade
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
		</section>
	);
};

export default Content;
