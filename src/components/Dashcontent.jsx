import React, { useState } from "react";
import Infocard from "./Infocard";
import Trademodal from "./Trademodal";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUsername } from "../features/userSlice";

const Content = () => {
	const [showModal, setshowModal] = useState(false);

	const username = useSelector(selectUsername);

	const currentLogin = JSON.parse(sessionStorage.getItem("lastLogin"));

	const closeModal = () => {
		setshowModal(false);
	};

	// useEffect(() => {
	// 	if (user) {
	// 		console.log(user);
	// 	}
	// }, [user]);

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
					<p className="font-bold">Starting Balance</p>
					<p>5000</p>
				</div>

				{/* insights */}
				<div className="flex justify-between capitalize gap-4">
					<Infocard title={"number of trades"} percentage={"0"} />
					<Infocard title={"win rate"} percentage={"0%"} />
					<Infocard title={"returns"} percentage={"+0r"} />
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
