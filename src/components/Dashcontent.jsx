import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUsername } from "../features/userSlice";
import Recentactivity from "./Recentactivity";
import Wallet from "./Wallet";

const Content = () => {
	const username = useSelector(selectUsername);
	const currentLogin = JSON.parse(sessionStorage.getItem("lastLogin"));

	return (
		<section className="p-6 w-full min-h-screen pt-28 md:pt-32 text-slate-600 dark:text-gray-300">
			<div className="flex flex-col gap-6 max-w-5xl mx-auto">
				<div className="flex flex-col">
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
				</div>

				<Wallet />
				{/* journal */}

				<Recentactivity
					tableTitle={"recent trades"}
					showFooter={false}
					count={5}
				/>
			</div>
		</section>
	);
};

export default Content;
