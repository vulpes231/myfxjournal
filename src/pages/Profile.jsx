import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	changePassword,
	editUserInfo,
	getUserInfo,
	resetUserAction,
	selectCurrentUser,
	selectUserSlice,
} from "../features/userSlice";
import { Errormodal, Loadingmodal, Successmodal } from "../components";

const Profile = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);
	const [form, setForm] = useState({
		username: user?.username || "",
		email: user?.email || "",
		password: "",
		newPassword: "",
		confirmPassword: "",
		currency: user?.currency || "USD",
		riskPerTrade: user?.settings?.maxRiskPerTrade || 1,
		timezone: user?.settings?.utc || "UTC+0",
	});
	const [error, setError] = useState("");

	const {
		updatePassLoading,
		updatePassError,
		passUpdated,
		modifyUserLoading,
		modifyUserError,
		userModified,
	} = useSelector(selectUserSlice);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleUpdateProfile = (e) => {
		e.preventDefault();
		const data = {
			username: form.username,
			email: form.email,
			riskPerTrade: form.riskPerTrade,
			timezone: form.timezone,
		};

		dispatch(editUserInfo(data));
	};

	const handleResetPassword = (e) => {
		e.preventDefault();
		if (form.newPassword === "" || form.confirmPassword === "") {
			setError("Passwords cannot be empty!");
			return;
		}
		if (form.newPassword !== form.confirmPassword) {
			setError("Passwords do not match!");
			return;
		}
		const data = {
			newPassword: form.newPassword,
			password: form.password,
		};

		dispatch(changePassword(data));
	};

	// effects

	useEffect(() => {
		if (updatePassError) {
			setError(updatePassError);
		}
		if (modifyUserError) {
			setError(modifyUserError);
		}
	}, [updatePassError, modifyUserError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetUserAction());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	useEffect(() => {
		let timeout;
		if (passUpdated || userModified) {
			timeout = setTimeout(() => {
				dispatch(resetUserAction());
				dispatch(getUserInfo());
				window.location.reload();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [passUpdated, userModified]);

	useEffect(() => {
		document.title = "ChronoTrade - Profile";
	}, []);

	return (
		<div className="flex flex-col gap-6 p-6 pt-28 md:pt-32 max-w-5xl mx-auto">
			{/* Row 1 */}
			<div className="flex flex-col md:flex-row gap-6 ">
				{/* Basic Info */}
				<div className="w-full md:w-1/2 bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6">
					<h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
						Basic Information
					</h2>
					<form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
								Username
							</label>
							<input
								type="text"
								name="username"
								value={form.username}
								onChange={handleChange}
								className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA9D2] dark:bg-slate-800 dark:text-white"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA9D2] dark:bg-slate-800 dark:text-white"
							/>
						</div>
						<button
							type="submit"
							className="bg-[#1FA9D2] hover:bg-[#1784a5] text-white rounded-lg px-4 py-2 text-sm font-medium transition"
						>
							Update Profile
						</button>
					</form>
				</div>

				{/* Reset Password */}
				<div className="w-full md:w-1/2 bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6">
					<h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
						Reset Password
					</h2>
					<form onSubmit={handleResetPassword} className="flex flex-col gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
								Current Password
							</label>
							<input
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA9D2] dark:bg-slate-800 dark:text-white"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
								New Password
							</label>
							<input
								type="password"
								name="newPassword"
								value={form.newPassword}
								onChange={handleChange}
								className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA9D2] dark:bg-slate-800 dark:text-white"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={form.confirmPassword}
								onChange={handleChange}
								className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA9D2] dark:bg-slate-800 dark:text-white"
							/>
						</div>
						<button
							type="submit"
							className="bg-[#1FA9D2] hover:bg-[#1784a5] text-white rounded-lg px-4 py-2 text-sm font-medium transition"
						>
							Reset Password
						</button>
					</form>
				</div>
			</div>

			{/* Journal Settings */}
			<div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6">
				<h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
					Journal Settings
				</h2>
				<form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
							Currency
						</label>
						<select
							name="currency"
							value={form.currency}
							onChange={handleChange}
							className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-slate-800 dark:text-white"
						>
							<option value="USD">USD</option>
							<option value="EUR">EUR</option>
							<option value="GBP">GPB</option>
							<option value="CAD">CAD</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
							Risk per Trade (%)
						</label>
						<input
							type="number"
							name="riskPerTrade"
							value={form.riskPerTrade}
							onChange={handleChange}
							min="0.1"
							max="10"
							step="0.1"
							className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA9D2] dark:bg-slate-800 dark:text-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
							Timezone
						</label>
						<select
							name="timezone"
							value={form.timezone}
							onChange={handleChange}
							className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-slate-800 dark:text-white"
						>
							<option value="UTC-5">UTC-5 (New York)</option>
							<option value="UTC+0">UTC+0 (London)</option>
							<option value="UTC+1">UTC+1 (Lagos)</option>
							<option value="UTC+8">UTC+8 (Hong Kong)</option>
						</select>
					</div>

					<button
						type="submit"
						className="bg-[#1FA9D2] hover:bg-[#1784a5] text-white rounded-lg px-4 py-2 text-sm font-medium transition"
					>
						Save Settings
					</button>
				</form>
			</div>
			{error && (
				<Errormodal error={error} isOpen={true} onClose={() => setError("")} />
			)}
			{passUpdated && (
				<Successmodal successText={"Password updated."} isOpen={true} />
			)}
			{userModified && (
				<Successmodal successText={"Profile updated."} isOpen={true} />
			)}
			{updatePassLoading && (
				<Loadingmodal loadingText={"Changing password"} isOpen={true} />
			)}
			{modifyUserLoading && (
				<Loadingmodal loadingText={"Updating user"} isOpen={true} />
			)}
		</div>
	);
};

export default Profile;
