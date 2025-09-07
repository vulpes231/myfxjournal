import React, { useEffect, useState } from "react";
import Custominput from "./Custominput";

const UpdateTrade = ({ tradeId, closeModal }) => {
	const [form, setForm] = useState({ sl: "", tp: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (tradeId) {
			console.log("update trade:", tradeId);
		}
	}, [tradeId]);

	return (
		<section className="w-full h-screen bg-black/50 dark:bg-white/50 flex items-center justify-center p-6 fixed top-0 left-0">
			<form action="" className="bg-white dark:bg-slate-900 p-6">
				<h3>Update trade</h3>
				<Custominput
					label={"stop loss"}
					value={form.sl}
					handleChange={handleChange}
					name={"sl"}
				/>
				<Custominput
					label={"take profit"}
					value={form.tp}
					handleChange={handleChange}
					name={"tp"}
				/>
				<div>
					<button>update</button>
					<button onClick={closeModal}>cancel</button>
				</div>
			</form>
		</section>
	);
};

export default UpdateTrade;
