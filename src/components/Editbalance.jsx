import React, { useState } from "react";
import Custominput from "./Custominput";
// import { LucidePanelTopClose } from "lucide-react";
import { MdClose } from "react-icons/md";

const Editbalance = ({ walletId, setModify }) => {
	const [form, setForm] = useState({ balance: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form, walletId);
	};

	return (
		<section className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black/70 dark:bg-white/70">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-white dark:bg-slate-900 p-6"
			>
				<div className="flex justify-end mb-4">
					<MdClose
						className="text-white cursor-pointer"
						onClick={() => setModify(false)}
					/>
				</div>
				<Custominput
					name={"balance"}
					value={form.balance}
					handleChange={handleChange}
					label={"Account Balance"}
					type={"text"}
				/>
				<button type="submit">update</button>
			</form>
		</section>
	);
};

export default Editbalance;
