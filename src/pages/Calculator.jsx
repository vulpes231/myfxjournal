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
	// Metals
	{ id: "xau/usd", name: "XAU/USD", multiplier: 0.01, pipValue: 1 }, // Gold

	// Majors
	{ id: "eur/usd", name: "EUR/USD", multiplier: 0.0001, pipValue: 10 },
	{ id: "gbp/usd", name: "GBP/USD", multiplier: 0.0001, pipValue: 10 },
	{ id: "usd/jpy", name: "USD/JPY", multiplier: 0.01, pipValue: 9.1 },
	{ id: "usd/chf", name: "USD/CHF", multiplier: 0.0001, pipValue: 10 },

	// Crosses
	{ id: "gbp/chf", name: "GBP/CHF", multiplier: 0.0001, pipValue: 10 },
	{ id: "gbp/jpy", name: "GBP/JPY", multiplier: 0.01, pipValue: 9.1 },

	// Indices
	{ id: "nas100", name: "NAS100 (Nasdaq)", multiplier: 1, pipValue: 1 },
	{ id: "us30", name: "US30 (Dow Jones)", multiplier: 1, pipValue: 1 },
	// Crypto
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

		// pip distances
		const stopLossPips = Math.abs(entry - sl) / asset.multiplier;
		const takeProfitPips = Math.abs(tp - entry) / asset.multiplier;

		// risk in USD
		const riskUsd = balance * (riskPercent / 100);

		// lot size calculation
		const lotSize = riskUsd / (stopLossPips * asset.pipValue);

		// actual loss and profit
		const lossUsd = stopLossPips * lotSize * asset.pipValue;
		const profitUsd = takeProfitPips * lotSize * asset.pipValue;

		setLot(lotSize);
		setLoss(lossUsd);
		setProfit(profitUsd);
	};

	return (
		<section className="pt-24 md:pt-28 px-4 md:px-8 min-h-screen bg-gray-50 dark:bg-black flex justify-center items-start pb-20">
			<div className="w-full max-w-3xl bg-[#fff] dark:bg-slate-900 shadow-lg rounded-2xl p-6 md:p-10">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
					Position Size Calculator
				</h2>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Customselect
							label={"Asset"}
							name={"asset"}
							value={form.asset}
							handleChange={handleChange}
							optionLabel={"Choose asset"}
							options={options}
						/>
						<Custominput
							label={"Balance ($)"}
							name={"balance"}
							value={form.balance}
							handleChange={handleChange}
						/>
						<Custominput
							label={"Risk (%)"}
							name={"riskPercent"}
							value={form.riskPercent}
							handleChange={handleChange}
						/>
						<Custominput
							label={"Entry Price"}
							name={"entry"}
							value={form.entry}
							handleChange={handleChange}
						/>
						<Custominput
							label={"Stop Loss"}
							name={"sl"}
							value={form.sl}
							handleChange={handleChange}
						/>
						<Custominput
							label={"Take Profit"}
							name={"tp"}
							value={form.tp}
							handleChange={handleChange}
						/>
					</div>

					<div className="flex flex-wrap justify-center gap-4 mt-4">
						<button
							className="px-6 py-2 rounded-xl text-white font-semibold shadow-md bg-[#1FA9D2] hover:bg-[#1889ad] transition"
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
							className="px-6 py-2 rounded-xl text-white font-semibold shadow-md bg-gray-500 hover:bg-gray-600 transition"
							type="button"
						>
							Clear
						</button>
					</div>
				</form>

				{/* Results Section */}
				<div className="mt-10 p-6 bg-gray-100 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
					<div>
						<h4 className="text-gray-600 font-medium">Lot Size</h4>
						<p className="text-lg md:text-xl font-bold text-gray-800">
							{parseFloat(lot).toFixed(2)}
						</p>
					</div>
					<div>
						<h4 className="text-gray-600 font-medium">Potential Profit</h4>
						<p className="text-lg md:text-xl font-bold text-green-600">
							${parseFloat(profit).toFixed(2)}
						</p>
					</div>
					<div>
						<h4 className="text-gray-600 font-medium">Potential Loss</h4>
						<p className="text-lg md:text-xl font-bold text-red-600">
							-${parseFloat(loss).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Calculator;
