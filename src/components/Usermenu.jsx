import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, LogOut, LucideUser, LucideUserCog } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Loadingmodal from "./Loadingmodal";
import { logoutUser, selectUserSlice } from "../features/userSlice";
import Errormodal from "./Errormodal";
import Successmodal from "./Successmodal";

const menuLinks = [
	{
		id: "profile",
		name: "Profile",
		path: "/profile",
		icon: <LucideUserCog size={18} />,
	},
	{
		id: "support",
		name: "Support",
		path: "/support",
		icon: <HelpCircle size={18} />,
	},
];

const Usermenu = () => {
	const dispatch = useDispatch();

	const [error, setError] = useState("");

	const { logoutLoading, logoutError, loggedOut } =
		useSelector(selectUserSlice);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutUser());
	};

	useEffect(() => {
		if (logoutError) {
			setError(logoutError);
		}
	}, [logoutError]);

	useEffect(() => {
		let timeout;
		if (loggedOut) {
			timeout = setTimeout(() => {
				sessionStorage.clear();
				window.location.href = "/";
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [loggedOut]);

	return (
		<div className="absolute top-[80px] right-[20px] md:right-[40px] lg:right-[80px] bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg flex flex-col gap-4 border border-gray-100 dark:border-slate-700 min-w-[200px]">
			{/* Username */}
			<span className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
				<LucideUser />
				<h6>Username</h6>
			</span>

			<hr className="border-gray-200 dark:border-slate-700" />

			{/* Links */}
			<div className="flex flex-col gap-2">
				{menuLinks.map((link) => (
					<Link
						key={link.id}
						to={link.path}
						className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition"
					>
						{link.icon}
						<span className="text-sm capitalize text-gray-700 dark:text-gray-200">
							{link.name}
						</span>
					</Link>
				))}
			</div>

			<hr className="border-gray-200 dark:border-slate-700" />

			{/* Logout */}
			<button
				type="button"
				onClick={handleLogout}
				className="flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
			>
				<LogOut size={18} />
				<span className="text-sm font-medium">Logout</span>
			</button>
			{error ? (
				<Errormodal error={error} />
			) : loggedOut ? (
				<Successmodal successText={"Logout success!"} />
			) : logoutLoading ? (
				<Loadingmodal loadingText={"Logging out"} />
			) : null}
		</div>
	);
};

export default Usermenu;
