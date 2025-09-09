import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/userSlice";

const Profile = () => {
	const user = useSelector(selectCurrentUser);

	const [form, setForm] = useState({
		username: user?.username || "",
		email: user?.email || "",
		newPassword: "",
		confirmPassword: "",
		defaultPair: "XAUUSD",
		riskPerTrade: 1,
		timezone: "UTC+0",
		enableDarkMode: false,
	});

	useEffect(() => {
		document.title = "ChronoTrade - Profile";
	}, []);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleUpdateProfile = (e) => {
		e.preventDefault();
		console.log("Update profile:", form.username, form.email);
	};

	const handleResetPassword = (e) => {
		e.preventDefault();
		if (form.newPassword !== form.confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		console.log("Reset password:", form.newPassword);
	};

	const handleUpdateSettings = (e) => {
		e.preventDefault();
		console.log("Update settings:", {
			defaultPair: form.defaultPair,
			riskPerTrade: form.riskPerTrade,
			timezone: form.timezone,
			enableDarkMode: form.enableDarkMode,
		});
	};

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
				<form onSubmit={handleUpdateSettings} className="flex flex-col gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
							Default Trading Pair
						</label>
						<select
							name="defaultPair"
							value={form.defaultPair}
							onChange={handleChange}
							className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-slate-800 dark:text-white"
						>
							<option value="XAUUSD">XAUUSD</option>
							<option value="EURUSD">EURUSD</option>
							<option value="GBPUSD">GBPUSD</option>
							<option value="BTCUSD">BTCUSD</option>
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
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							name="enableDarkMode"
							checked={form.enableDarkMode}
							onChange={handleChange}
							className="h-4 w-4 rounded border-gray-300 text-[#1FA9D2] focus:ring-[#1FA9D2]"
						/>
						<label className="text-sm text-gray-700 dark:text-gray-300">
							Enable Dark Mode
						</label>
					</div>
					<button
						type="submit"
						className="bg-[#1FA9D2] hover:bg-[#1784a5] text-white rounded-lg px-4 py-2 text-sm font-medium transition"
					>
						Save Settings
					</button>
				</form>
			</div>
		</div>
	);
};

export default Profile;
