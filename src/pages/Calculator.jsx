import React, { useState } from "react";
import Custominput from "../components/Custominput";
import Customselect from "../components/Customselect";

const initialState = {
	balance: "",
	sl: "",
	asset: "",
	tp: "",
	entry: "",
	riskPercent: "",
};

const options = [
	{ id: "xau/usd", name: "XAU/USD", multiplier: 0.01, pipValue: 1 },
	{ id: "eur/usd", name: "EUR/USD", multiplier: 0.0001, pipValue: 10 },
	{ id: "gbp/usd", name: "GBP/USD", multiplier: 0.0001, pipValue: 10 },
	{ id: "usd/jpy", name: "USD/JPY", multiplier: 0.01, pipValue: 9.1 },
	{ id: "usd/chf", name: "USD/CHF", multiplier: 0.0001, pipValue: 10 },
	{ id: "gbp/chf", name: "GBP/CHF", multiplier: 0.0001, pipValue: 10 },
	{ id: "gbp/jpy", name: "GBP/JPY", multiplier: 0.01, pipValue: 9.1 },
	{ id: "nas100", name: "NAS100 (Nasdaq)", multiplier: 1, pipValue: 1 },
	{ id: "us30", name: "US30 (Dow Jones)", multiplier: 1, pipValue: 1 },
	{ id: "btc/usd", name: "BTC/USD", multiplier: 1, pipValue: 1 },
];

const Calculator = () => {
	const [form, setForm] = useState(initialState);
	const [lot, setLot] = useState(0);
	const [loss, setLoss] = useState(0);
	const [profit, setProfit] = useState(0);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const balance = parseFloat(form.balance);
		const entry = parseFloat(form.entry);
		const sl = parseFloat(form.sl);
		const tp = parseFloat(form.tp);
		const riskPercent = parseFloat(form.riskPercent);

		if (!balance || !entry || !sl || !tp || !riskPercent || !form.asset) {
			alert("Please fill in all fields correctly.");
			return;
		}

		const asset = options.find((op) => op.id === form.asset);
		if (!asset) return;

		const stopLossPips = Math.abs(entry - sl) / asset.multiplier;
		const takeProfitPips = Math.abs(tp - entry) / asset.multiplier;
		const riskUsd = balance * (riskPercent / 100);
		const lotSize = riskUsd / (stopLossPips * asset.pipValue);

		const lossUsd = stopLossPips * lotSize * asset.pipValue;
		const profitUsd = takeProfitPips * lotSize * asset.pipValue;

		setLot(lotSize);
		setLoss(lossUsd);
		setProfit(profitUsd);
	};

	return (
		<section className="pt-24 md:pt-28 px-4 md:px-8 min-h-screen bg-gray-50 dark:bg-black flex justify-center items-start pb-20">
			<div className="w-full max-w-4xl bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8 md:p-12">
				{/* Title */}
				<div className="text-center mb-10">
					<h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
						Position Size Calculator
					</h2>
					<p className="text-gray-500 dark:text-gray-400 mt-2">
						Plan your trades with precise risk management
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Customselect
							label="Asset"
							name="asset"
							value={form.asset}
							handleChange={handleChange}
							optionLabel="Choose asset"
							options={options}
						/>
						<Custominput
							label="Account Balance ($)"
							name="balance"
							value={form.balance}
							handleChange={handleChange}
							placeHolder="e.g. 5000"
						/>
						<Custominput
							label="Risk Percentage (%)"
							name="riskPercent"
							value={form.riskPercent}
							handleChange={handleChange}
							placeHolder="e.g. 1"
						/>
						<Custominput
							label="Entry Price"
							name="entry"
							value={form.entry}
							handleChange={handleChange}
							placeHolder="e.g. 3540.80"
						/>
						<Custominput
							label="Stop Loss Price"
							name="sl"
							value={form.sl}
							handleChange={handleChange}
							placeHolder="e.g. 3490.00"
						/>
						<Custominput
							label="Take Profit Price"
							name="tp"
							value={form.tp}
							handleChange={handleChange}
							placeHolder="e.g. 3600.00"
						/>
					</div>

					{/* Buttons */}
					<div className="flex flex-wrap justify-center gap-4 mt-6">
						<button
							className="px-6 py-2.5 rounded-lg text-white font-semibold shadow-md bg-[#1FA9D2] hover:bg-[#1889ad] transition"
							type="submit"
						>
							Calculate
						</button>
						<button
							onClick={() => {
								setForm(initialState);
								setLoss(0);
								setProfit(0);
								setLot(0);
							}}
							className="px-6 py-2.5 rounded-lg text-white font-semibold shadow-md bg-gray-500 hover:bg-gray-600 transition"
							type="button"
						>
							Clear
						</button>
					</div>
				</form>

				{/* Results */}
				<div className="mt-12">
					<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
						Results
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-gray-100 dark:bg-slate-950 rounded-xl p-6 shadow-sm text-center">
							<h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Lot Size
							</h4>
							<p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
								{lot ? parseFloat(lot).toFixed(2) : "--"}
							</p>
						</div>
						<div className="bg-gray-100 dark:bg-slate-950 rounded-xl p-6 shadow-sm text-center">
							<h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Potential Profit
							</h4>
							<p className="text-2xl font-bold text-green-600 mt-2">
								{profit ? `$${parseFloat(profit).toFixed(2)}` : "--"}
							</p>
						</div>
						<div className="bg-gray-100 dark:bg-slate-950 rounded-xl p-6 shadow-sm text-center">
							<h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Potential Loss
							</h4>
							<p className="text-2xl font-bold text-red-600 mt-2">
								{loss ? `-$${parseFloat(loss).toFixed(2)}` : "--"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Calculator;
