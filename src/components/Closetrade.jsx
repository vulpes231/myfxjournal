import React, { useEffect, useState } from "react";
import Customselect from "./Customselect";
import Custominput from "./Custominput";

const Closetrade = ({ tradeId, closeModal }) => {
	const [form, setForm] = useState({ closePrice: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
	};

	useEffect(() => {
		if (tradeId) {
			console.log("close trade:", tradeId);
		}
	}, [tradeId]);

	return (
		<section className="fixed top-0 left-0 w-full h-screen bg-black/50 dark:bg-white/50 flex items-center justify-center p-6">
			<form
				onSubmit={handleSubmit}
				action=""
				className="bg-white dark:bg-slate-900"
			>
				<h3>Close trade</h3>
				<Custominput
					label={"closing price"}
					value={form.closePrice}
					handleChange={handleChange}
					name={"closePrice"}
				/>
				<div>
					<button type="submit"> close</button>
					<button type="button" onClick={closeModal}>
						{" "}
						cancel
					</button>
				</div>
			</form>
		</section>
	);
};

export default Closetrade;
